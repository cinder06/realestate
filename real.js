
function showNextSection(currentSectionId, nextSectionId) {
    const currentSection = document.getElementById(currentSectionId);
    const nextSection = document.getElementById(nextSectionId);
    
    currentSection.style.display = 'none';
    nextSection.style.display = 'block';
    
    if (nextSectionId === 'section-submit') {
        // Show the submit button when we are in the section-submit
        document.getElementById('submit-button').style.display = 'block'; 
    } else {
        // Hide the submit button for all other sections
        document.getElementById('submit-button').style.display = 'none'; 
    }
}


// Function to navigate to the previous section
function goToPreviousSection(currentSectionId) {
    var currentSection = document.getElementById(currentSectionId);
    var formSections = Array.from(document.querySelectorAll('.form-section'));
    var currentIndex = formSections.findIndex(section => section.id === currentSectionId);
    if (currentIndex > 0) {
        currentSection.style.display = 'none';
        formSections[currentIndex - 1].style.display = 'block';
    }
}

// Function to validate input sections before navigating
function validateInputSection(currentSectionId, nextSectionId, inputId) {
    var inputElement = document.getElementById(inputId);
    if (inputElement && inputElement.value.trim() !== '') {
        showNextSection(currentSectionId, nextSectionId);
    } else {
        
    alert('Please fill in the required field.');
    return false;
    
    }
}



// Function to mark all input fields as required
function markFieldsAsRequired() {
    var inputFields = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="number"], input[type="date"], input[type="radio"], input[type="checkbox"]');
    inputFields.forEach(function(inputField) {
        inputField.setAttribute('required', 'required');
    });
}

// Call the function to mark fields as required on page load
window.onload = markFieldsAsRequired;



// Function to validate multiple input sections before navigating
function validateMultipleInputSection(currentSectionId, nextSectionId) {
    var currentSection = document.getElementById(currentSectionId);
    var inputElements = currentSection.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="number"], input[type="date"]');
    
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].value.trim() === '') {
            alert('Please fill in all the required fields.');
            return false;
        }
    }
    
    showNextSection(currentSectionId, nextSectionId);
}



// Function to validate multiple input sections (including radio buttons) before navigating
function validateMultipleInputSectionIncludingRadio(currentSectionId, nextSectionId) {
    var currentSection = document.getElementById(currentSectionId);
    
    // Validate text, email, password, number, and date inputs
    var inputElements = currentSection.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="number"], input[type="date"]');
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].value.trim() === '') {
            alert('Please fill in all the required fields.');
            return false;
        }
    }

    // Validate radio buttons
    var radioGroups = {};
    var radioElements = currentSection.querySelectorAll('input[type="radio"]');
    radioElements.forEach(function(radio) {
        var name = radio.getAttribute('name');
        if (!radioGroups[name]) {
            radioGroups[name] = [];
        }
        radioGroups[name].push(radio);
    });

    for (var groupName in radioGroups) {
        if (radioGroups.hasOwnProperty(groupName)) {
            var isAnyRadioChecked = radioGroups[groupName].some(function(radio) {
                return radio.checked;
            });
            if (!isAnyRadioChecked) {
                alert('Please select an option for all radio button groups.');
                return false;
            }
        }
    }
    
    showNextSection(currentSectionId, nextSectionId);
}



// Enhanced Function to validate multiple input sections (including radio buttons and textarea) before navigating
function validateMultipleInputSectionEnhanced(currentSectionId, nextSectionId) {
    var currentSection = document.getElementById(currentSectionId);
    
    // Validate text, email, password, number, date inputs, and textarea
    var inputElements = currentSection.querySelectorAll('input[type="text"], input[type="email"], input[type="password"], input[type="number"], input[type="date"], textarea');
    for (var i = 0; i < inputElements.length; i++) {
        if (inputElements[i].value.trim() === '') {
            alert('Please fill in all the required fields.');
            return false;
        }
    }

    // Validate radio buttons
    var radioGroups = {};
    var radioElements = currentSection.querySelectorAll('input[type="radio"]');
    radioElements.forEach(function(radio) {
        var name = radio.getAttribute('name');
        if (!radioGroups[name]) {
            radioGroups[name] = [];
        }
        radioGroups[name].push(radio);
    });

    for (var groupName in radioGroups) {
        if (radioGroups.hasOwnProperty(groupName)) {
            var isAnyRadioChecked = radioGroups[groupName].some(function(radio) {
                return radio.checked;
            });
            if (!isAnyRadioChecked) {
                alert('Please select an option for all radio button groups.');
                return false;
            }
        }
    }
    
    showNextSection(currentSectionId, nextSectionId);
}

$('#bootstrapForm').submit(function (event) {
    event.preventDefault()
    var extraData = {}
    {
        /* Parsing input date id=1424073354 */
        var dateField = $("#1424073354_date").val()
        var timeField = $("#1424073354_time").val()
        let d = new Date(dateField)
        if (!isNaN(d.getTime())) {
            extraData["entry.1424073354_year"] = d.getFullYear()
            extraData["entry.1424073354_month"] = d.getMonth() + 1
            extraData["entry.1424073354_day"] = d.getUTCDate()
        }
        if (timeField && timeField.split(':').length >= 2) {
            let values = timeField.split(':')
            extraData["entry.1424073354_hour"] = values[0]
            extraData["entry.1424073354_minute"] = values[1]
        }
    }
    $('#bootstrapForm').ajaxSubmit({
        data: extraData,
        dataType: 'jsonp',  // This won't really work. It's just to use a GET instead of a POST to allow cookies from different domain.
        error: function () {
            // Submit of form should be successful but JSONP callback will fail because Google Forms
            // does not support it, so this is handled as a failure.
            alert('Form Submitted. Thanks.')
            // You can also redirect the user to a custom thank-you page:
            // window.location = 'http://www.mydomain.com/thankyoupage.html'
        }
    })
})

$(document).ready(function() {
    setTimeout(function() {
        var approvalSection = document.getElementById("approval-section");
        if (approvalSection) {
            approvalSection.style.display = "flex";
        }
    }, 2000);  // This waits for 2 seconds after the page loads to show the div
});
