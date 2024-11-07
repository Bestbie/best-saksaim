// src/ImageMover.js

import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const ImageMover = () => {
    // Sample image data
    const initialImages = [
        { id: '1', src: 'https://via.placeholder.com/100?text=Image+1' },
        { id: '2', src: 'https://via.placeholder.com/100?text=Image+2' },
        { id: '3', src: 'https://via.placeholder.com/100?text=Image+3' },
    ];

    const [images, setImages] = useState(initialImages);

    const onDragEnd = (result) => {
        if (!result.destination) return; // If dropped outside

        const reorderedImages = Array.from(images);
        const [removed] = reorderedImages.splice(result.source.index, 1); // Remove dragged item
        reorderedImages.splice(result.destination.index, 0, removed); // Insert item at new position

        setImages(reorderedImages); // Update state
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="images">
                {(provided) => (
                    <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}
                    >
                        {images.map((image, index) => (
                            <Draggable key={image.id} draggableId={image.id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        style={{
                                            ...provided.draggableProps.style,
                                            display: 'flex',
                                            alignItems: 'center',
                                            border: '1px solid lightgray',
                                            borderRadius: '5px',
                                            padding: '1px',
                                        }}
                                    >
                                        <img src={image.src} alt={`Image ${image.id}`} style={{ width: '50px', height: '50px', marginRight: '10px' }} />
                                        <span>Image {image.id}</span>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default ImageMover;
