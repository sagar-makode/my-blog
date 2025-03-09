import { Stage, Layer, Text, Image } from 'react-konva';
import useImage from 'use-image'; // Hook to load an image
import React, { useRef, useState, useEffect } from 'react';
import calculateXPos from './calculateXPos';
import templates from '../templates/templates';


const GenerateBiodataImages = ({ sections, selectedTemplate, onImageGenerated }) => {

    const selectedTemplateData = templates.find(template => template.id === selectedTemplate) || templates[1];

    const [image] = useImage(selectedTemplateData.image, 'anonymous'); // Set crossOrigin to anonymous
    const stageRef = useRef(null); // Ref for Konva stage
    const [isStageLoaded, setIsStageLoaded] = useState(false); // Track if stage is loaded

    const layout = selectedTemplateData.layout;  // This is the biodata JSON data


    useEffect(() => {
        // Ensure stageRef is properly loaded after the image is loaded
        if (image) {
            setIsStageLoaded(true);
        }
    }, [image]); // Re-run when image is loaded

    useEffect(() => {
        if (isStageLoaded && stageRef.current) {
            const canvas = stageRef.current.toCanvas({ pixelRatio: 3 });
            const imgData = canvas.toDataURL('image/png', 1.0);

            // Send the image data back to the parent component
            if (onImageGenerated) {
                onImageGenerated(imgData);
            }
        }
    }, [isStageLoaded]);



    return (
        <div className="text-center">
            <Stage width={1200} height={1600} ref={stageRef}>
                <Layer>
                    {/* Background Image */}
                    <Image image={image} x={0} y={0} width={1200} height={1600} />

                    {/* Biodata Title */}
                    <Text
                        text={layout.title.text}
                        x={calculateXPos(layout.title.text, layout.title.fontSize, 1200, layout.title.fontFamily)}
                        y={layout.title.y}
                        fontSize={layout.title.fontSize}
                        fontFamily={layout.title.fontFamily}
                        fill={layout.title.color}
                    />

                    {/* Render Sections and Fields with One Y Value */}
                    {
                        (() => {
                            let sectionY = layout.subtitle.y; // Start from below the title
                            const sectionElements = []; // To store all the section elements

                            // Loop over each section
                            for (let sectionIndex = 0; sectionIndex < sections.length; sectionIndex++) {
                                const section = sections[sectionIndex];

                                // Section Title
                                sectionElements.push(
                                    <Text
                                        key={`title-${sectionIndex}`}
                                        text={section.title}
                                        x={layout.subtitle.x}
                                        y={sectionY}
                                        fontSize={layout.subtitle.fontSize}
                                        fontFamily={layout.subtitle.fontFamily}
                                        fill={layout.subtitle.color}
                                    />
                                );

                                // Increment sectionY for fields after the title
                                sectionY += layout.subtitle.fontSize + 17;

                                // Loop through fields and render
                                section.fields.forEach((field, fieldIndex) => {
                                    const fieldY = sectionY + fieldIndex * (layout.fields.fontSize + 12); // Adjust spacing between fields

                                    sectionElements.push(
                                        <Text
                                            key={`field-${sectionIndex}-${fieldIndex}`}
                                            text={`${field.label}: ${field.value || ''}`}
                                            x={layout.fields.x}
                                            y={fieldY}
                                            fontSize={layout.fields.fontSize}
                                            fontFamily={layout.fields.fontFamily}
                                            fill={layout.fields.color}
                                        />
                                    );
                                });
                                // Update sectionY after rendering all fields in this section
                                sectionY += section.fields.length * (layout.fields.fontSize + 13); // Add extra space between sections
                            }

                            return sectionElements; // Return all section elements
                        })()
                    }
                </Layer>
            </Stage>

        </div>
    );
};

export default GenerateBiodataImages;
