// Spark & Scale Registration Form JavaScript
class RegistrationForm {
    constructor() {
        this.currentPage = 1;
        this.totalPages = 4;
        this.formData = {};
        
        this.initializeElements();
        this.attachEventListeners();
        this.updateProgress();
        this.showPage(this.currentPage);
    }
    
    initializeElements() {
        this.form = document.getElementById('registrationForm');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.submitBtn = document.getElementById('submitBtn');
        this.progressFill = document.getElementById('progressFill');
        this.currentPageSpan = document.getElementById('currentPage');
        this.topicsCount = document.getElementById('topicsCount');
        this.successPage = document.getElementById('successPage');
        this.formNavigation = document.querySelector('.form-navigation');
        
        this.pages = [
            document.getElementById('page1'),
            document.getElementById('page2'),
            document.getElementById('page3'),
            document.getElementById('page4')
        ];
    }
    
    attachEventListeners() {
        // Navigation buttons
        this.nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.nextPage();
        });
        
        this.prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            this.prevPage();
        });
        
        // This listener is now crucial for final form submission
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitForm();
        });
        
        // Topics counter
        const topicsCheckboxes = document.querySelectorAll('input[name="topics"]');
        topicsCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => this.updateTopicsCounter());
        });
        
        // Clear errors on input/change
        this.form.addEventListener('input', (e) => {
            this.clearError(e.target);
        });
        
        this.form.addEventListener('change', (e) => {
            this.clearError(e.target);
        });
        
        // Prevent form submission on Enter in text fields (except textarea)
        this.form.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.tagName !== 'TEXTAREA' && e.target.type !== 'submit') {
                e.preventDefault();
            }
        });
    }
    
    updateProgress() {
        const progress = (this.currentPage / this.totalPages) * 100;
        this.progressFill.style.width = `${progress}%`;
        this.currentPageSpan.textContent = this.currentPage;
    }
    
    showPage(pageNumber) {
        // Hide all pages
        this.pages.forEach(page => {
            page.classList.remove('active');
            page.style.display = 'none';
        });
        
        // Show current page
        const currentPageElement = this.pages[pageNumber - 1];
        if (currentPageElement) {
            currentPageElement.classList.add('active');
            currentPageElement.style.display = 'block';
        }
        
        // Update navigation buttons
        this.prevBtn.style.display = pageNumber === 1 ? 'none' : 'inline-flex';
        this.nextBtn.style.display = pageNumber === this.totalPages ? 'none' : 'inline-flex';
        this.submitBtn.style.display = pageNumber === this.totalPages ? 'inline-flex' : 'none';
        
        this.updateProgress();
    }
    
    nextPage() {
        if (this.validateCurrentPage()) {
            this.saveCurrentPageData();
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.showPage(this.currentPage);
            }
        }
    }
    
    prevPage() {
        if (this.currentPage > 1) {
            this.currentPage--;
            this.showPage(this.currentPage);
        }
    }
    
    validateCurrentPage() {
        // Clear previous errors first
        this.clearAllErrors();
        
        switch (this.currentPage) {
            case 1:
                return this.validatePage1();
            case 2:
                return this.validatePage2();
            case 3:
                return this.validatePage3();
            case 4:
                return this.validatePage4();
            default:
                return false;
        }
    }
    
    validatePage1() {
        let isValid = true;
        
        const fullName = document.getElementById('fullName');
        const email = document.getElementById('email');
        const whatsapp = document.getElementById('whatsapp');
        const status = document.querySelector('input[name="status"]:checked');
        
        if (!fullName || !fullName.value.trim()) {
            this.showError('fullName', 'Please enter your full name');
            isValid = false;
        }
        
        if (!email || !email.value.trim()) {
            this.showError('email', 'Please enter your email address');
            isValid = false;
        } else if (!this.isValidEmail(email.value)) {
            this.showError('email', 'Please enter a valid email address');
            isValid = false;
        }
        
        if (!whatsapp || !whatsapp.value.trim()) {
            this.showError('whatsapp', 'Please enter your WhatsApp number');
            isValid = false;
        }
        
        if (!status) {
            this.showError('status', 'Please select your current status');
            isValid = false;
        }
        
        return isValid;
    }
    
    validatePage2() {
        let isValid = true;
        
        const journey = document.querySelector('input[name="journey"]:checked');
        const hurdle = document.getElementById('hurdle');
        
        if (!journey) {
            this.showError('journey', 'Please select your entrepreneurial journey stage');
            isValid = false;
        }
        
        if (!hurdle || !hurdle.value.trim()) {
            this.showError('hurdle', 'Please share your thoughts on entrepreneurial hurdles');
            isValid = false;
        }
        
        return isValid;
    }
    
    validatePage3() {
        let isValid = true;
        
        const selectedTopics = document.querySelectorAll('input[name="topics"]:checked');
        const goal = document.querySelector('input[name="goal"]:checked');
        
        if (selectedTopics.length !== 3) {
            this.showError('topics', 'Please select exactly 3 topics you\'re most excited about');
            isValid = false;
        }
        
        if (!goal) {
            this.showError('goal', 'Please select what you hope to walk away with');
            isValid = false;
        }
        
        return isValid;
    }
    
    validatePage4() {
        let isValid = true;
        
        const referral = document.querySelector('input[name="referral"]:checked');
        const whatsappGroup = document.querySelector('input[name="whatsappGroup"]:checked');
        
        if (!referral) {
            this.showError('referral', 'Please tell us how you found out about us');
            isValid = false;
        }
        
        if (!whatsappGroup) {
            this.showError('whatsappGroup', 'Please let us know about joining the WhatsApp group');
            isValid = false;
        }
        
        return isValid;
    }
    
    isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    showError(fieldName, message) {
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block'; // Ensure error message is visible
            
            // Add error styling to field
            const field = document.getElementById(fieldName);
            if (field) {
                field.style.borderColor = 'var(--color-error)';
            } else {
                const radioField = document.querySelector(`input[name="${fieldName}"]`);
                if (radioField) {
                    const container = radioField.closest('.radio-group') || radioField.closest('.checkbox-group');
                    if (container) {
                        container.style.borderColor = 'var(--color-error)';
                    }
                }
            }
        }
    }
    
    clearError(field) {
        if (!field) return;
        
        const fieldName = field.name || field.id;
        const errorElement = document.getElementById(`${fieldName}-error`);
        if (errorElement) {
            errorElement.textContent = ''; // Clear the error message text
            errorElement.style.display = 'none'; // Hide the error message
        }
        
        // Remove error styling
        if (field.type === 'radio' || field.type === 'checkbox') {
            const container = field.closest('.radio-group') || field.closest('.checkbox-group');
            if (container) {
                container.style.borderColor = '';
            }
        } else {
            field.style.borderColor = '';
        }
    }
    
    clearAllErrors() {
        const errorElements = document.querySelectorAll('.error-message');
        errorElements.forEach(error => {
            error.textContent = '';
            error.style.display = 'none';
        });
        
        const fields = document.querySelectorAll('.form-control');
        fields.forEach(field => {
            field.style.borderColor = '';
        });
        
        const containers = document.querySelectorAll('.radio-group, .checkbox-group');
        containers.forEach(container => {
            container.style.borderColor = '';
        });
    }
    
    updateTopicsCounter() {
        const selectedTopics = document.querySelectorAll('input[name="topics"]:checked');
        if (this.topicsCount) {
            this.topicsCount.textContent = selectedTopics.length;
        }
        
        // Disable other checkboxes if 3 are selected
        const allTopicsCheckboxes = document.querySelectorAll('input[name="topics"]');
        allTopicsCheckboxes.forEach(checkbox => {
            const option = checkbox.closest('.checkbox-option');
            if (!checkbox.checked && selectedTopics.length >= 3) {
                checkbox.disabled = true;
                if (option) option.style.opacity = '0.5';
            } else {
                checkbox.disabled = false;
                if (option) option.style.opacity = '1';
            }
        });
        
        // Clear topics error if exactly 3 are selected
        if (selectedTopics.length === 3) {
            const topicsError = document.getElementById('topics-error');
            if (topicsError) {
                topicsError.textContent = '';
                topicsError.style.display = 'none';
            }
        }
    }
    
    saveCurrentPageData() {
        // Collect data from current page and store it in this.formData
        const currentPageElement = this.pages[this.currentPage - 1];
        if (!currentPageElement) return;

        const inputs = currentPageElement.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            if (input.type === 'checkbox') {
                if (!this.formData[input.name]) {
                    this.formData[input.name] = [];
                }
                if (input.checked) {
                    if (!this.formData[input.name].includes(input.value)) {
                        this.formData[input.name].push(input.value);
                    }
                } else {
                     // Remove from array if unchecked.
                    const index = this.formData[input.name].indexOf(input.value);
                    if (index > -1) {
                        this.formData[input.name].splice(index, 1);
                    }
                }
            } else if (input.type === 'radio') {
                if (input.checked) {
                    this.formData[input.name] = input.value;
                }
            } else {
                this.formData[input.name] = input.value;
            }
        });
    }

    // New method to handle the final submission
    submitForm() {
        if (this.validateCurrentPage()) {
            this.saveCurrentPageData(); // Save the final page's data
            
            const formData = new FormData(this.form);
            const url = this.form.action;

            fetch(url, {
                method: 'POST',
                body: formData,
            })
            .then(response => {
                if (response.ok) {
                    this.showSuccessPage();
                } else {
                    console.error('Form submission failed');
                    // You can add an error message to display to the user
                }
            })
            .catch(error => {
                console.error('Network error during form submission:', error);
                // You can add an error message to display to the user
            });
        }
    }
    
    showSuccessPage() {
        this.form.style.display = 'none';
        this.successPage.classList.remove('hidden');
        this.formNavigation.style.display = 'none';
        const progressContainer = document.querySelector('.progress-container');
        if (progressContainer) {
            progressContainer.style.display = 'none';
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}

// Initialize the form when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new RegistrationForm();
});
