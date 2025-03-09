import React, { useEffect, useRef, useState } from 'react';
import { FaCheck, FaPencilAlt, FaTrash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BiodataForm = ({ selectedTemplateid }) => {
    const inputRefs = useRef([]); // Store references for dynamic inputs

   // Load data from sessionStorage, if it exists, or use the default state
   const initialSections = JSON.parse(sessionStorage.getItem('sections')) || [
    {
        title: 'वैयक्तीक माहिती',
        fields: [
            { label: 'संपूर्ण नाव', value: '' },
            { label: 'जन्म दिनांक', value: '' },
            { label: 'जन्म वेळ', value: '' },
            { label: 'जन्म ठिकाण', value: '' },
            { label: 'जात', value: '' },
            { label: 'गोत्र', value: '' },
            { label: 'कुलदैवत', value: '' },
            { label: 'देवक', value: '' },
            { label: 'नक्षत्र', value: '' },
            { label: 'रास', value: '' },
            { label: 'गण', value: '' },
            { label: 'नाडी', value: '' },
            { label: 'उंची', value: '' },
            { label: 'वर्ण', value: '' }, 
            { label: 'रक्तगट', value: '' },
            { label: 'शिक्षण', value: '' },
            { label: 'नोकरी/व्यवसाय', value: '' },
            { label: 'वेतन/उत्पन्न', value: '' }
        ]
    },
    {
        title: 'कौटूंबिक माहिती',
        fields: [
            { label: 'वडिलांचे नाव', value: '' },
            { label: 'वडिलांचा व्यवसाय', value: '' },
            { label: 'आईचे नाव', value: '' },
            { label: 'बहीण', value: '' },
            { label: 'भाऊ', value: '' },
            { label: 'मामा', value: '' },
            { label: 'नातेसंबंध', value: '' }
        ]
    },
    {
        title: 'संपर्क माहिती',
        fields: [
            { label: 'निवासी पत्ता', value: '' },
            { label: 'मोबाईल नंबर', value: '' }
        ]
    }
];

const [sections, setSections] = useState(initialSections);

 // Save sectons to sessionStorage whenever they change
   useEffect(() => {    
    sessionStorage.setItem('sections', JSON.stringify(sections));

}, [sections]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            const updatedSections = sections.map((section) => ({
                ...section,
                fields: section.fields.map((field, index) => {
                    const inputRef = inputRefs.current[index];
                    if (inputRef && !inputRef.contains(event.target)) {
                        return {
                            ...field,
                            isEditing: field.label.trim() === '' // Remain in edit mode if label is empty
                                ? true
                                : false
                        };
                    }
                    return field;
                }),
            }));

            setSections(updatedSections);
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [sections]);


    // Toggle edit mode

    // Toggle edit mode for a field
    const toggleEditMode = (sectionIndex, fieldIndex) => {
        const updatedSections = [...sections].map((section, sIndex) => ({
            ...section,
            fields: section.fields.map((field, fIndex) => ({
                ...field,
                isEditing: sIndex === sectionIndex && fIndex === fieldIndex ? true : field.isEditing
            }))
        }));
        setSections(updatedSections);
    };

    // Handle section title change
    const handleSectionTitleChange = (index, value) => {
        const updatedSections = [...sections];
        updatedSections[index].title = value;
        setSections(updatedSections);
    };

    // Handle field change
    const handleFieldChange = (sectionIndex, fieldIndex, key, value) => {

        const updatedSections = [...sections];
        updatedSections[sectionIndex].fields[fieldIndex][key] = value;
        setSections(updatedSections);
    };

    // Add a new field to a section
    const handleAddField = (sectionIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].fields.push({ label: 'इतर माहिती', value: '' });
        setSections(updatedSections);
    };

    // Add a new section
    const handleAddSection = () => {
        const newSection = { title: 'इतर माहिती', fields: [{ label: 'इतर माहिती', value: '' }] };
        const updatedSections = [...sections, newSection];
        setSections(updatedSections);
    };

    // Delete a section
    const handleDeleteSection = (index) => {
        if (sections.length > 1) {
            const updatedSections = sections.filter((_, i) => i !== index);
            setSections(updatedSections);
        }
    };

    // Delete a field
    const handleDeleteField = (sectionIndex, fieldIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].fields = updatedSections[sectionIndex].fields.filter((_, i) => i !== fieldIndex);
        setSections(updatedSections);
    };
    // Toggle edit mode for a section
    const toggleSectionEditMode = (sectionIndex) => {
        const updatedSections = [...sections];
        updatedSections[sectionIndex].isEditingtitle = !updatedSections[sectionIndex].isEditingtitle;
        setSections(updatedSections);
    };
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault();
        navigate('/free-marriage-biodata/preview', { state: { sections } }); // Navigate to preview page
        sessionStorage.setItem('selectedTemplateid', selectedTemplateid);

    };
    return (
        <div className="container" style={{ marginTop: '2%' }}>
            <div className="row justify-content-center">
                <div className="col-lg-10">
                    <div className="creat-test-container">
                        <div className="card-body">
                            <form onSubmit={handleSubmit}>
                                {/* <div className="d-flex flex-column flex-md-row justify-content-between">
                                    <h2 className="flex-grow-1 mb-2 mb-md-0">Add your details</h2>
                                </div> */}
                
                                {sections.map((section, sectionIndex) => (
                                    <div key={sectionIndex} className="mb-3 mt-3">
                                        {/* Section Title */}
                                        {section.isEditingtitle ? (
                                            <div className="d-flex align-items-baseline ">
                                                <input
                                                    type="text"
                                                    className="form-control mb-3"
                                                    value={section.title}
                                                    onChange={(e) => handleSectionTitleChange(sectionIndex, e.target.value)}
                                                    required
                                                />
                                                <FaCheck
                                                    className="ml-2"
                                                    style={{
                                                        cursor: 'pointer',
                                                        color: 'green',
                                                        marginLeft: '10px',
                                                        fontSize: '1.2rem',
                                                    }}
                                                    onClick={() => toggleSectionEditMode(sectionIndex)} // Save and switch to normal mode
                                                />

                                                <FaTrash
                                                    className="ml-2"
                                                    style={{
                                                        cursor: 'pointer',
                                                        color: 'red',
                                                        marginLeft: '10px',
                                                        fontSize: '1.2rem',
                                                    }}
                                                    onClick={() => handleDeleteSection(sectionIndex)}
                                                />

                                            </div>

                                        ) : (
                                            <div className="d-flex align-items-baseline justify-content-between">


                                                <span className="form-label" style={{
                                                    fontWeight: 'bold',
                                                    fontSize: '1.5rem', // Adjust the size as needed
                                                    color: '#2C3E50', // Dark color for emphasis
                                                    marginRight: '10px', // Add some margin for spacing
                                                    padding: '5px 10px', // Optional: Add some padding for a more 'buttoned' look
                                                    borderBottom: '2px solid #3498db', // Optional: Underline the title with a color
                                                    display: 'inline-block',
                                                }} >{section.title}</span>
                                                <div className='d-flex'>

                                                    <FaPencilAlt
                                                        className="ml-2"
                                                        style={{
                                                            cursor: 'pointer',
                                                            color: 'blue',
                                                            marginLeft: '10px',
                                                            fontSize: '1.2rem',
                                                        }}
                                                        onClick={() => toggleSectionEditMode(sectionIndex)} // Toggle edit mode
                                                    />


                                                    <FaTrash
                                                        className="ml-2"

                                                        style={{
                                                            cursor: 'pointer',
                                                            color: 'red',
                                                            marginLeft: '10px',
                                                            fontSize: '1.2rem',
                                                        }}

                                                        onClick={() => handleDeleteSection(sectionIndex)}
                                                    />
                                                </div>

                                            </div>
                                        )}



                                        {/* Render Fields in Section */}
                                        {section.fields.map((field, fieldIndex) => (
                                            <div className="mb-3 mt-3" key={fieldIndex}>
                                                {field.isEditing ? (
                                                    <div className="d-flex align-items-baseline ">

                                                        <input
                                                            ref={(el) => (inputRefs.current[fieldIndex] = el)}
                                                            type="text"
                                                            className="form-control mb-3"
                                                            placeholder="Label"
                                                            value={field.label}
                                                            onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'label', e.target.value)} // Fix typo here
                                                        />
                                                        {fieldIndex > 0 && (
                                                            <FaTrash
                                                                className='align-items-baseline'
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    color: 'red',
                                                                    marginLeft: '10px',
                                                                    fontSize: '1.2rem',

                                                                }}
                                                                onClick={() => handleDeleteField(sectionIndex, fieldIndex)}
                                                            />
                                                        )}

                                                    </div>

                                                ) : (
                                                    <div className="d-flex align-items-baseline justify-content-between">
                                                        <span className="form-label">{field.label}</span>

                                                        <div className="d-flex ">
                                                            <FaPencilAlt
                                                                style={{
                                                                    cursor: 'pointer',
                                                                    color: 'blue',
                                                                    marginLeft: '10px',
                                                                    fontSize: '1.2rem',
                                                                }}
                                                                onClick={() => toggleEditMode(sectionIndex, fieldIndex)}
                                                            />
                                                            {fieldIndex > 0 && (
                                                                <FaTrash
                                                                    style={{
                                                                        cursor: 'pointer',
                                                                        color: 'red',
                                                                        marginLeft: '10px',
                                                                        fontSize: '1.2rem',
                                                                    }}
                                                                    onClick={() => handleDeleteField(sectionIndex, fieldIndex)}
                                                                />
                                                            )}
                                                        </div>
                                                    </div>


                                                )}



                                                <input
                                                    type="text"
                                                    className="form-control"
                                                    placeholder={field.label}
                                                    value={field.value}
                                                    onChange={(e) => handleFieldChange(sectionIndex, fieldIndex, 'value', e.target.value)} // Fix typo here
                                                    
                                                />


                                            </div>
                                        ))}

                                        {/* Add Field Button */}
                                        <button
                                            type="button"
                                            className="btn btn-secondary mb-3"
                                            onClick={() => handleAddField(sectionIndex)}
                                        >
                                            + Add Field
                                        </button>
                                    </div>
                                ))}

                                {/* Add Section Button */}
                                <button
                                    type="button"
                                    className="btn btn-secondary mb-3"
                                    onClick={handleAddSection}
                                >
                                    + Add Section
                                </button>

                                {/* Submit Button */}
                                <div>

                                    <button type="submit" className="btn btn-success mt-2">
                                        Submit
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BiodataForm;
