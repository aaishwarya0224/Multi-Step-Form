// Dark Mode Toggle
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeStylesheet = document.getElementById('theme-stylesheet');

// Apply saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme') || 'styles.css';
  themeStylesheet.setAttribute('href', savedTheme);
  themeIcon.src = savedTheme === 'dark.css' ? 'sun.png' : 'moon.png';

  // Restore form data for all forms
  const forms = ['personal-info-form', 'address-info-form', 'preferences-form'];
  forms.forEach((formId) => {
    if (document.getElementById(formId)) {
      restoreFormData(formId);
    }
  });

  // Populate summary if on summary page
  if (window.location.pathname.includes('index4.html')) {
    populateSummary();
  }
});

// Toggle between light and dark themes
themeToggle.addEventListener('click', () => {
  const isDarkMode = themeStylesheet.getAttribute('href') === 'dark.css';

  if (isDarkMode) {
    // Switch to light mode
    themeStylesheet.setAttribute('href', 'styles.css');
    themeIcon.src = 'moon.png';
    localStorage.setItem('theme', 'styles.css');
  } else {
    // Switch to dark mode
    themeStylesheet.setAttribute('href', 'dark.css');
    themeIcon.src = 'sun.png';
    localStorage.setItem('theme', 'dark.css');
  }
});

// Validate Form Fields
function validateForm(formId) {
  const form = document.getElementById(formId);
  const mandatoryFields = form.querySelectorAll('[required]');
  let isValid = true;

  mandatoryFields.forEach((field) => {
    const errorMsg = document.getElementById(`${field.id}-error`);
    if (!field.value.trim()) {
      isValid = false;
      field.classList.add('error');
      if (errorMsg) errorMsg.style.display = 'inline'; // Show error
    } else {
      field.classList.remove('error');
      if (errorMsg) errorMsg.style.display = 'none'; // Hide error
    }
  });

  return isValid;
}

// Navigate Between Pages
function navigateTo(url, formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('input, select');

  // Save data to localStorage
  inputs.forEach((input) => {
    localStorage.setItem(input.id, input.value);
  });

  // Navigate to the specified URL
  window.location.href = url;
}

// Restore Form Data
function restoreFormData(formId) {
  const form = document.getElementById(formId);
  const inputs = form.querySelectorAll('input, select');

  // Populate fields with stored data
  inputs.forEach((input) => {
    if (localStorage.getItem(input.id)) {
      if (input.type === 'checkbox') {
        input.checked = true;
      } else {
        input.value = localStorage.getItem(input.id);
      }
    }
  });
}

// Populate Summary Page
function populateSummary() {
  const summaryContent = document.getElementById('summary-content');
  const preferences = ['preference-a', 'preference-b', 'preference-c', 'preference-d', 'preference-e']
    .filter((pref) => localStorage.getItem(pref)) // Only keep selected preferences
    .map((pref) => `<li>${localStorage.getItem(pref)}</li>`)
    .join('');

  const summaryData = `
    <h3>Personal Information</h3>
    <p><b>First Name:</b> ${localStorage.getItem('first-name') || 'N/A'}</p>
    <p><b>Last Name:</b> ${localStorage.getItem('last-name') || 'N/A'}</p>
    <p><b>Email:</b> ${localStorage.getItem('email') || 'N/A'}</p>
    <p><b>Phone Number:</b> ${localStorage.getItem('phone') || 'N/A'}</p>

    <h3>Address Information</h3>
    <p><b>House/Flat No/Name:</b> ${localStorage.getItem('house-name') || 'N/A'}</p>
    <p><b>City:</b> ${localStorage.getItem('city') || 'N/A'}</p>
    <p><b>State:</b> ${localStorage.getItem('state') || 'N/A'}</p>
    <p><b>Country:</b> ${localStorage.getItem('country') || 'N/A'}</p>

    <h3>Preferences</h3>
    <ul>
      ${preferences || '<li>No preferences selected.</li>'}
    </ul>
  `;
  summaryContent.innerHTML = summaryData;
}

// Submit Form Function
function submitForm() {
  alert('Form submitted successfully!');
  localStorage.clear(); // Clear stored data
  window.location.href = 'index.html'; // Redirect to start or thank you page
}

// Event Listeners for Forms
document.addEventListener('DOMContentLoaded', () => {
  // Personal Info Form (index.html)
  const personalInfoForm = document.getElementById('personal-info-form');
  if (personalInfoForm) {
    personalInfoForm.addEventListener('submit', (event) => {
      event.preventDefault();
      if (validateForm('personal-info-form')) {
        navigateTo('index2.html', 'personal-info-form');
      }
    });
  }

  // Address Info Form (index2.html)
  const addressInfoForm = document.getElementById('address-info-form');
  if (addressInfoForm) {
    const nextButton = document.querySelector('.btn-next');
    const prevButton = document.querySelector('.btn-prev');

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        if (validateForm('address-info-form')) {
          navigateTo('index3.html', 'address-info-form');
        }
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        navigateTo('index.html', 'address-info-form');
      });
    }
  }

  // Preferences Form (index3.html)
  const preferencesForm = document.getElementById('preferences-form');
  if (preferencesForm) {
    const nextButton = document.querySelector('.btn-next');
    const prevButton = document.querySelector('.btn-prev');

    if (nextButton) {
      nextButton.addEventListener('click', () => {
        // Save selected preferences
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach((checkbox) => {
          if (checkbox.checked) {
            localStorage.setItem(checkbox.id, checkbox.value);
          } else {
            localStorage.removeItem(checkbox.id);
          }
        });

        navigateTo('index4.html', 'preferences-form');
      });
    }

    if (prevButton) {
      prevButton.addEventListener('click', () => {
        navigateTo('index2.html', 'preferences-form');
      });
    }
  }
});