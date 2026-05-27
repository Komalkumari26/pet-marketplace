// frontend/src/pages/AdminPanel.jsx
import React, { useState, useEffect } from 'react';
import { getStats, getAllUsers, getAllPets, deletePet as deletePetApi, getPendingPets, updatePetStatus } from '../services/admin';

function AdminPanel() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [stats, setStats] = useState({ totalUsers: 0, totalPets: 0, soldPets: 0 });
  const [users, setUsers] = useState([]);
  const [allPets, setAllPets] = useState([]);
  const [pendingPets, setPendingPets] = useState([]);
  const [selectedPet, setSelectedPet] = useState(null);
  const [messageToSeller, setMessageToSeller] = useState('');
  const [messageSent, setMessageSent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pendingCount, setPendingCount] = useState(0);

  // Mock data for orders/charts (unchanged)
  const [ordersCount, setOrdersCount] = useState(320);
  const [revenue, setRevenue] = useState(28650);
  const [enquiries, setEnquiries] = useState(42);
  const weeklySales = [8500, 7200, 9800, 6400, 11200, 8700, 9500];
  const days = ['May 24', 'May 25', 'May 26', 'May 27', 'May 28', 'May 29', 'May 30'];
  const orderStatus = [
    { status: 'Completed', count: 180, percentage: 56 },
    { status: 'Processing', count: 90, percentage: 28 },
    { status: 'Pending', count: 35, percentage: 11 },
    { status: 'Cancelled', count: 15, percentage: 5 },
  ];

  useEffect(() => {
    fetchAdminData();
    // Optional: poll for new pending pets every 30 seconds
    const interval = setInterval(() => {
      if (activeTab === 'verification') fetchPendingPets();
    }, 30000);
    return () => clearInterval(interval);
  }, [activeTab]);

  const fetchAdminData = async () => {
    setLoading(true);
    try {
      const [statsRes, usersRes, petsRes] = await Promise.all([
        getStats(),
        getAllUsers(),
        getAllPets(),
      ]);
      setStats(statsRes.data);
      setUsers(usersRes.data);
      setAllPets(petsRes.data);
      await fetchPendingPets();
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchPendingPets = async () => {
    try {
      const res = await getPendingPets();
      const pending = res.data;
      setPendingPets(pending);
      setPendingCount(pending.length);
      if (pending.length > 0 && activeTab === 'verification' && !selectedPet) {
        setSelectedPet(pending[0]);
      } else if (pending.length === 0) {
        setSelectedPet(null);
      }
    } catch (err) {
      console.error('Failed to fetch pending pets', err);
      setPendingPets([]);
      setPendingCount(0);
    }
  };

  const handleDeletePet = async (petId) => {
    if (window.confirm('Delete this pet?')) {
      await deletePetApi(petId);
      fetchAdminData();
    }
  };

  const handleDeleteUser = async (userId) => {
    if (window.confirm('Delete this user? All their pets will also be deleted.')) {
      // Add deleteUser API call if needed
      alert('Delete user functionality not fully implemented.');
    }
  };

  const handleSendMessage = () => {
    alert(`Message sent to seller:\n${messageToSeller}`);
    setMessageSent(true);
    setTimeout(() => setMessageSent(false), 3000);
    setMessageToSeller('');
  };

  const handleVerifyPet = async (status) => {
    if (!selectedPet) return;
    try {
      await updatePetStatus(selectedPet._id, status);
      alert(`Pet ${selectedPet.name} marked as ${status.toUpperCase()}`);
      await fetchPendingPets(); // refresh list
    } catch (err) {
      console.error(err);
      alert('Failed to update status');
    }
  };

  if (loading) return <div className="admin-loading">Loading admin panel...</div>;

  return (
    <div className="admin-container">
      <aside className="admin-sidebar">
        <ul className="sidebar-nav">
          <li className={activeTab === 'dashboard' ? 'active' : ''} onClick={() => setActiveTab('dashboard')}>📊 Dashboard</li>
          <li className={activeTab === 'pets' ? 'active' : ''} onClick={() => setActiveTab('pets')}>🐕 Pets</li>
          <li className={activeTab === 'users' ? 'active' : ''} onClick={() => setActiveTab('users')}>👤 Users</li>
          <li className={activeTab === 'verification' ? 'active' : ''} onClick={() => setActiveTab('verification')}>
            ✅ Pet Verification {pendingCount > 0 && <span className="badge">{pendingCount}</span>}
          </li>
        </ul>
      </aside>

      <main className="admin-main">
        <div className="admin-header">
          <h1>Admin Panel</h1>
          <p>Welcome back, Admin! 🐾 Here's what's happening with your pet store today.</p>
        </div>

        {activeTab === 'dashboard' && (
          <div className="dashboard">
            <div className="stats-grid">
              <div className="stat-card"><h3>🐾 Total Pets</h3><p>{stats.totalPets}</p><small>↑ 12 this week</small></div>
              <div className="stat-card"><h3>📦 Total Orders</h3><p>{ordersCount}</p><small>↑ 18 this week</small></div>
              <div className="stat-card"><h3>👥 Total Users</h3><p>{stats.totalUsers}</p><small>↑ 32 this week</small></div>
              <div className="stat-card"><h3>💰 Total Revenue</h3><p>₹{revenue.toLocaleString()}</p><small>↑ 15%</small></div>
              <div className="stat-card"><h3>💬 Enquiries</h3><p>{enquiries}</p><small>↓ 5 this week</small></div>
            </div>

            <div className="two-columns">
              <div className="chart-panel">
                <h3>Sales Overview</h3>
                <div className="chart">
                  {weeklySales.map((sale, i) => (
                    <div key={i} className="bar-item">
                      <div className="bar" style={{ height: `${(sale / Math.max(...weeklySales)) * 80}px` }}></div>
                      <span>{days[i].slice(-5)}</span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="status-panel">
                <h3>Orders by Status</h3>
                <ul className="status-list">
                  {orderStatus.map(item => (
                    <li key={item.status}>
                      <span>{item.status}</span>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: `${item.percentage}%`, backgroundColor: item.status === 'Completed' ? '#10b981' : item.status === 'Processing' ? '#f97316' : item.status === 'Pending' ? '#f59e0b' : '#dc2626' }}></div></div>
                      <span>{item.count} ({item.percentage}%)</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="recent-table">
              <h3>Recent Pets</h3>
              <table>
                <thead><tr><th>Pet</th><th>Category</th><th>Breed</th><th>Price</th><th>Status</th><th>Action</th></tr></thead>
                <tbody>
                  {allPets.slice(0, 4).map(pet => (
                    <tr key={pet._id}>
                      <td>{pet.name}</td><td>{pet.category}</td><td>{pet.breed}</td><td>₹{pet.price}</td>
                      <td><span className={`status-badge ${pet.isSold ? 'sold' : 'active'}`}>{pet.isSold ? 'Sold' : 'Active'}</span></td>
                      <td><button className="delete-icon" onClick={() => handleDeletePet(pet._id)}>🗑️</button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="recent-orders">
              <h3>Recent Orders</h3>
              <ul><li>Order #ORD1256 - Bruno (Golden Retriever) - Completed</li><li>Order #ORD1255 - Milo (Persian Cat) - Processing</li><li>Order #ORD1254 - Charlie (Beagle) - Pending</li><li>Order #ORD1253 - Luna (Maine Coon) - Cancelled</li></ul>
            </div>
          </div>
        )}

        {activeTab === 'pets' && (
          <div className="full-table">
            <h3>All Pets</h3>
            <table className="data-table"><thead><tr><th>Name</th><th>Category</th><th>Breed</th><th>Price</th><th>Seller</th><th>Status</th><th>Action</th></tr></thead><tbody>
              {allPets.map(pet => (
                <tr key={pet._id}><td>{pet.name}</td><td>{pet.category}</td><td>{pet.breed}</td><td>₹{pet.price}</td><td>{pet.seller?.name}</td><td><span className={`status-badge ${pet.isSold ? 'sold' : 'active'}`}>{pet.isSold ? 'Sold' : 'Active'}</span></td><td><button className="delete-btn" onClick={()=>handleDeletePet(pet._id)}>Delete</button></td></tr>
              ))}
            </tbody></table>
          </div>
        )}

        {activeTab === 'users' && (
          <div className="full-table">
            <h3>All Users</h3>
            <table className="data-table"><thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Action</th></tr></thead><tbody>
              {users.map(user => (
                <tr key={user._id}><td>{user.name}</td><td>{user.email}</td><td>{user.role}</td><td><button className="delete-btn" onClick={()=>handleDeleteUser(user._id)}>Delete</button></td></tr>
              ))}
            </tbody></table>
          </div>
        )}

        {activeTab === 'verification' && (
          <div className="verification">
            <h3>Pet Verification</h3>
            <p>Review pets added by sellers</p>
            {pendingPets.length === 0 ? <p>No pending pets. 🎉</p> : (
              <>
                {selectedPet && (
                  <div className="verification-card">
                    <div className="card-header"><h2>{selectedPet.name}</h2><div><button className="approve" onClick={() => handleVerifyPet('active')}>Approve</button><button className="reject" onClick={() => handleVerifyPet('rejected')}>Reject</button></div></div>
                    <div className="pet-info"><p><strong>Category:</strong> {selectedPet.category}</p><p><strong>Breed:</strong> {selectedPet.breed}</p><p><strong>Age:</strong> {selectedPet.age} months</p><p><strong>Price:</strong> ₹{selectedPet.price}</p><p><strong>Seller:</strong> {selectedPet.seller?.name}</p><p><strong>Location:</strong> {selectedPet.location}</p></div>
                    <div><strong>About</strong><p>{selectedPet.description}</p></div>
                    <div className="message"><textarea value={messageToSeller} onChange={e=>setMessageToSeller(e.target.value)} rows="3" placeholder="Message to seller..."></textarea><button className="send" onClick={handleSendMessage}>Send Message</button>{messageSent && <p className="sent">Sent!</p>}</div>
                  </div>
                )}
                <div className="pending-list"><h4>Other Pending Pets</h4><table className="data-table"><thead><tr><th>Pet</th><th>Seller</th><th>Action</th></tr></thead><tbody>{pendingPets.map(pet => (<tr key={pet._id}><td>{pet.name}</td><td>{pet.seller?.name}</td><td><button onClick={()=>setSelectedPet(pet)}>Review</button></td></tr>))}</tbody></table></div>
              </>
            )}
          </div>
        )}
      </main>

      <style>{`
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', system-ui, sans-serif; background: #f1f5f9; }
        .admin-container { display: flex; height: 100vh; overflow: hidden; }
        .admin-sidebar { width: 240px; background: #0f172a; color: #e2e8f0; padding: 0; }
        .sidebar-nav { list-style: none; margin: 0; padding: 0; }
        .sidebar-nav li { padding: 0.8rem 1.2rem; cursor: pointer; transition: 0.2s; font-weight: 500; border-left: 3px solid transparent; position: relative; }
        .sidebar-nav li:hover { background: #1e293b; }
        .sidebar-nav li.active { background: #f97316; color: white; border-left-color: #fff; }
        .badge { background: #ef4444; color: white; border-radius: 20px; padding: 0.1rem 0.5rem; font-size: 0.7rem; margin-left: 0.5rem; }
        .admin-main { flex: 1; padding: 1rem; overflow-y: auto; }
        .admin-header { margin-bottom: 1rem; }
        .admin-header h1 { font-size: 1.4rem; font-weight: 600; }
        .admin-header p { font-size: 0.8rem; color: #475569; }
        .dashboard { max-width: 1200px; margin: 0 auto; }
        .stats-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 1rem; margin-bottom: 1.5rem; }
        .stat-card { background: white; padding: 0.75rem; border-radius: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.05); text-align: center; }
        .stat-card h3 { font-size: 0.8rem; color: #475569; margin-bottom: 0.25rem; }
        .stat-card p { font-size: 1.5rem; font-weight: 700; color: #0f172a; }
        .stat-card small { font-size: 0.7rem; color: #10b981; }
        .two-columns { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; }
        .chart-panel, .status-panel { background: white; border-radius: 16px; padding: 0.8rem; box-shadow: 0 1px 3px rgba(0,0,0,0.05); }
        .chart-panel h3, .status-panel h3 { font-size: 0.9rem; margin-bottom: 0.6rem; }
        .chart { display: flex; justify-content: space-around; align-items: flex-end; height: 110px; gap: 0.4rem; }
        .bar-item { display: flex; flex-direction: column; align-items: center; flex: 1; }
        .bar { width: 28px; background: #f97316; border-radius: 4px 4px 0 0; }
        .bar-item span { font-size: 0.65rem; margin-top: 0.4rem; color: #475569; }
        .status-list { list-style: none; }
        .status-list li { display: flex; align-items: center; gap: 0.5rem; font-size: 0.75rem; margin-bottom: 0.6rem; }
        .progress-bar { flex: 1; height: 6px; background: #e2e8f0; border-radius: 3px; overflow: hidden; }
        .progress-fill { height: 100%; }
        .recent-table, .recent-orders { background: white; border-radius: 16px; padding: 0.8rem; margin-bottom: 1rem; }
        .recent-table table { width: 100%; font-size: 0.75rem; border-collapse: collapse; }
        .recent-table th, .recent-table td { padding: 0.4rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
        .status-badge { display: inline-block; padding: 0.15rem 0.5rem; border-radius: 20px; font-size: 0.65rem; color: white; }
        .status-badge.active { background: #10b981; }
        .status-badge.sold { background: #dc2626; }
        .delete-icon { background: none; border: none; cursor: pointer; color: #dc2626; }
        .recent-orders ul { list-style: none; padding: 0; }
        .recent-orders li { padding: 0.4rem 0; border-bottom: 1px solid #e2e8f0; font-size: 0.75rem; }
        .full-table { background: white; border-radius: 16px; padding: 1rem; overflow-x: auto; margin-bottom: 1rem; }
        .data-table { width: 100%; font-size: 0.8rem; border-collapse: collapse; }
        .data-table th, .data-table td { padding: 0.6rem; text-align: left; border-bottom: 1px solid #e2e8f0; }
        .delete-btn { background: #dc2626; color: white; border: none; padding: 0.2rem 0.6rem; border-radius: 12px; cursor: pointer; }
        .verification { background: white; border-radius: 16px; padding: 1rem; }
        .verification-card { border: 1px solid #e2e8f0; border-radius: 12px; padding: 1rem; margin: 1rem 0; }
        .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem; }
        .approve, .reject { padding: 0.2rem 0.6rem; border-radius: 20px; font-size: 0.7rem; margin-left: 0.3rem; }
        .approve { background: #10b981; color: white; }
        .reject { background: #dc2626; color: white; }
        .pet-info { display: grid; grid-template-columns: repeat(auto-fill,minmax(150px,1fr)); gap: 0.3rem; font-size: 0.75rem; }
        .message textarea { width: 100%; border-radius: 8px; border: 1px solid #cbd5e1; padding: 0.5rem; font-size: 0.75rem; }
        .send { background: #3b82f6; color: white; border: none; padding: 0.3rem 0.8rem; border-radius: 20px; cursor: pointer; margin-top: 0.3rem; }
        .admin-loading { text-align: center; padding: 2rem; }
      `}</style>
    </div>
  );
}

export default AdminPanel;