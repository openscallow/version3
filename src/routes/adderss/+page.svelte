<script>
  import { Info, Save, School } from 'lucide-svelte';

  let schoolName = '';

  const schools = [
    "AKSHARJYOTI HIGHER SECONDARY SCHOOL",
    "ANGLO URDU HIGH SCHOOL",
    "ANKUR HIGH SCHOOL",
    "ANKUR VIDHYABHAVAN(H.S.)",
    "ASHADEEP UCCHTAR MADHYAMIK SHALA",
    "ASHADEEP VIDHYALAY",
    "ASPIRE PUBLIC SCHOOL",
    "B.H.KALSARIYA UCHCHATAR MADH. SHALA",
    "BOGHRA AND AGRAWAL HIGHER SECONDARY SCHOOL",
    "C. S. VIDYA BHARTI ENGLISH SCHOOL"
  ];

  function handleSave() {
    if (schoolName.trim()) {
      localStorage.setItem('userSchool', schoolName.trim());
      console.log('School name stored successfully');
      // Redirect or show success message
window.location.href = '../MVC';


    } else {
      console.log('School name is empty, not stored');
      // Show error message to user
    }
  }
</script>

<div class="container">
  <div class="header">
    <School color="#3b82f6" size={32} />
    <h2>Enter Your School</h2>
  </div>
  
  <div class="input-wrapper">
    <input
      list="school"
      class="school-input"
      placeholder="Start typing your school name..."
      bind:value={schoolName}
    />
    <datalist id="school">
      {#each schools as school}
        <option value={school} />
      {/each}
    </datalist>
  </div>
  
  <div class="info-text">
    <Info color="#3b82f6" size={18} />
    <span>You can change this information anytime</span>
  </div>
  
  <button on:click={handleSave} class="save-button">
    <Save size={20} />
    <span>Save School</span>
  </button>
</div>

<style>
  .container {
    max-width: 400px;
    margin: 40px auto;
    padding: 24px;
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }

  .header {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
  }

  .header h2 {
    margin: 0 0 0 12px;
    font-size: 24px;
    font-weight: bold;
    color: #1f2937;
  }

  .input-wrapper {
    margin-bottom: 16px;
  }

  .school-input {
    width: 100%;
    padding: 12px;
    font-size: 16px;
    border: 1px solid #d1d5db;
    border-radius: 4px;
    transition: all 0.2s ease-in-out;
  }

  .school-input:focus {
    outline: none;
    border-color: #3b82f6;
    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
  }

  .info-text {
    display: flex;
    align-items: center;
    margin-bottom: 24px;
    font-size: 14px;
    color: #6b7280;
  }

  .info-text :global(svg) {
    margin-right: 8px;
  }

  .save-button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 12px;
    background-color: #3b82f6;
    color: white;
    border: none;
    border-radius: 4px;
    font-size: 16px;
    font-weight: bold;
    cursor: pointer;
    transition: background-color 0.2s ease-in-out;
  }

  .save-button:hover {
    background-color: #2563eb;
  }

  .save-button :global(svg) {
    margin-right: 8px;
  }
</style>
