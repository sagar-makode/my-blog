import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import jsPDF from 'jspdf';
import GenerateBiodataImages from '../components/GenerateBiodataImages ';
import TopCards from '../components/TopCards';

const BiodataPreview = () => {
    const location = useLocation();
    const { sections } = location.state || {};

    const [selectedTemplate, setSelectedTemplate] = useState(sessionStorage.getItem('selectedTemplateid') || 'defaultTemplateId'); // Initialize state with sessionStorage value

    const [generatedImage, setGeneratedImage] = useState(null);

    // Reset generated image whenever the template changes
    useEffect(() => {
        setGeneratedImage(null); // Clear the image when template changes
    }, [selectedTemplate]);

    const handleDownloadImage = () => {
        const link = document.createElement('a');
        link.href = generatedImage;
        link.download = 'biodata_image.png'; // You can customize the filename here
        link.click();
    };

    const handleDownloadPDF = () => {
        if (!generatedImage) {
            console.error('No generated image found');
            return;
        }

        // Create PDF from the generated image
        const pdf = new jsPDF('p', 'mm', 'a4');

        try {
            // Convert the image to a data URL with lower quality for smaller size
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            const img = new Image();
            img.src = generatedImage;

            img.onload = () => {
                // Resize the image to fit A4 page size (210mm x 297mm)
                const aspectRatio = img.width / img.height;
                const pdfWidth = 210; // A4 width in mm
                const pdfHeight = pdfWidth / aspectRatio; // Maintain aspect ratio

                if (pdfHeight > 297) {
                    // If the height exceeds A4 size, adjust the height to fit
                    const scale = 297 / pdfHeight;
                    canvas.width = img.width * scale;
                    canvas.height = img.height * scale;
                } else {
                    canvas.width = img.width;
                    canvas.height = img.height;
                }

                // Draw the image onto the canvas
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

                // Create the PDF from the canvas image with lower quality
                const imgData = canvas.toDataURL('image/jpeg', 0.5); // 0.5 is the quality setting (range: 0 to 1)

                // Add the image to the PDF
                pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);

                // Save the PDF
                pdf.save('biodata.pdf');
            };
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    return (
        <>


            <TopCards setSelectedTemplateid={setSelectedTemplate} selectedTemplateid={selectedTemplate} />
            <div className="container " style={{ marginTop: '2%' }}>
                <h2 className="text-center">Preview Your Biodata</h2>

                {sections ? (
                    <>
                        {!generatedImage &&
                            <GenerateBiodataImages
                                key={selectedTemplate} // Forces remount when selectedTemplate changes

                                sections={sections}
                                selectedTemplate={selectedTemplate}
                                onImageGenerated={setGeneratedImage} // Passing the callback to update the state
                            />

                        }



                        {/* Display the generated image */}
                        {generatedImage && (
                            <div className="mt-4 text-center">
                                <h4>Generated Image</h4>
                                <img
                                    src={generatedImage}
                                    id='biodata-preview-img'
                                    alt="Generated Biodata"
                                    style={{ maxWidth: '100%', border: '2px solid #ddd', borderRadius: '8px' }}
                                />
                                <div className="mt-4">
                                    <button onClick={handleDownloadImage} className="btn btn-primary me-3">
                                        Download Image
                                    </button>
                                    <button onClick={handleDownloadPDF} className="btn btn-secondary">
                                        Download PDF
                                    </button>
                                </div>
                            </div>
                        )}
                    </>
                ) : (
                    <p className="text-center text-danger">No data found. Please fill the form first.</p>
                )}
            </div>
        </>
    );
};

export default BiodataPreview;
