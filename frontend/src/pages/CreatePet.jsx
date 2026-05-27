// frontend/src/pages/CreatePet.jsx
import React, { useState } from 'react';
import { createPet } from '../services/pets';
import { uploadImages } from '../services/uploadService'; // we'll create this
import { useNavigate } from 'react-router-dom';

function CreatePet() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    breed: '',
    age: '',
    price: '',
    location: '',
    category: 'dog',
    description: '',
    images: [] // will hold Cloudinary URLs after upload
  });
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + form.images.length > 5) {
      alert('Maximum 5 images allowed');
      return;
    }
    setSelectedFiles(files);
    // Create preview URLs
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    try {
      const imageUrls = await uploadImages(selectedFiles);
      setForm(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }));
      setSelectedFiles([]);
      setImagePreviews([]);
      alert('Images uploaded successfully!');
    } catch (err) {
      console.error(err);
      alert('Upload failed. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  const removeImage = (indexToRemove) => {
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, idx) => idx !== indexToRemove)
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.images.length === 0) {
      alert('Please upload at least one image of your pet');
      return;
    }
    setLoading(true);
    try {
      await createPet(form);
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.msg || 'Failed to create pet');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: '800px', margin: '2rem auto', padding: '0 1rem' }}>
      <h2>Add a Pet for Sale</h2>

      {/* Basic fields */}
      <div style={styles.fieldRow}>
        <label style={styles.label}>Name</label>
        <input name="name" value={form.name} onChange={handleChange} required style={styles.input} />
      </div>
      <div style={styles.fieldRow}>
        <label style={styles.label}>Breed</label>
        <input name="breed" value={form.breed} onChange={handleChange} required style={styles.input} />
      </div>
      <div style={styles.fieldRow}>
        <label style={styles.label}>Age (months)</label>
        <input name="age" type="number" value={form.age} onChange={handleChange} required style={styles.input} />
      </div>
      <div style={styles.fieldRow}>
        <label style={styles.label}>Price (₹)</label>
        <input name="price" type="number" value={form.price} onChange={handleChange} required style={styles.input} />
      </div>
      <div style={styles.fieldRow}>
        <label style={styles.label}>Location</label>
        <input name="location" value={form.location} onChange={handleChange} required style={styles.input} />
      </div>
      <div style={styles.fieldRow}>
        <label style={styles.label}>Category</label>
        <select name="category" value={form.category} onChange={handleChange} style={styles.input}>
          <option value="dog">Dog</option>
          <option value="cat">Cat</option>
          <option value="bird">Bird</option>
          <option value="fish">Fish</option>
          <option value="rabbit">Rabbit</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div style={styles.fieldRow}>
        <label style={styles.label}>Description</label>
        <textarea name="description" value={form.description} onChange={handleChange} rows="3" style={styles.input} />
      </div>

      {/* Image upload area */}
      <div style={styles.imageSection}>
        <label style={styles.label}>Pet Photos (max 5)</label>
        <input type="file" multiple accept="image/*" onChange={handleFileSelect} disabled={uploading} />
        {imagePreviews.length > 0 && (
          <div style={styles.previewContainer}>
            {imagePreviews.map((src, idx) => (
              <img key={idx} src={src} alt={`preview-${idx}`} style={styles.preview} />
            ))}
            <button type="button" onClick={handleUpload} disabled={uploading} style={styles.uploadBtn}>
              {uploading ? 'Uploading...' : 'Upload Images'}
            </button>
          </div>
        )}
        {form.images.length > 0 && (
          <div style={styles.uploadedImages}>
            <p>Uploaded images:</p>
            <div style={styles.previewContainer}>
              {form.images.map((url, idx) => (
                <div key={idx} style={styles.uploadedImageWrapper}>
                  <img src={url} alt={`pet-${idx}`} style={styles.preview} />
                  <button type="button" onClick={() => removeImage(idx)} style={styles.removeBtn}>✕</button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button type="submit" disabled={loading || uploading} style={styles.submitBtn}>
        {loading ? 'Creating...' : 'Create Pet'}
      </button>
    </form>
  );
}

const styles = {
  fieldRow: {
    marginBottom: '1rem',
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: '1rem',
  },
  label: {
    flex: '0 0 120px',
    fontWeight: '600',
  },
  input: {
    flex: '1',
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
  },
  imageSection: {
    marginTop: '1rem',
    marginBottom: '1rem',
  },
  previewContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '0.5rem',
    marginTop: '0.5rem',
    alignItems: 'center',
  },
  preview: {
    width: '80px',
    height: '80px',
    objectFit: 'cover',
    borderRadius: '8px',
  },
  uploadBtn: {
    background: '#3b82f6',
    color: 'white',
    border: 'none',
    padding: '0.5rem 1rem',
    borderRadius: '6px',
    cursor: 'pointer',
  },
  uploadedImages: {
    marginTop: '1rem',
  },
  uploadedImageWrapper: {
    position: 'relative',
  },
  removeBtn: {
    position: 'absolute',
    top: '-5px',
    right: '-5px',
    background: 'red',
    color: 'white',
    border: 'none',
    borderRadius: '50%',
    width: '20px',
    height: '20px',
    fontSize: '12px',
    cursor: 'pointer',
  },
  submitBtn: {
    background: '#f97316',
    color: 'white',
    border: 'none',
    padding: '0.8rem 2rem',
    borderRadius: '30px',
    fontSize: '1rem',
    fontWeight: '600',
    cursor: 'pointer',
    marginTop: '1rem',
    width: '100%',
  },
};

export default CreatePet;