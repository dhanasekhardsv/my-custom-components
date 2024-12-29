import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle } from 'lucide-react';

const DOMChangeTracker = () => {
    const contentRef = useRef(null);
    const [changes, setChanges] = useState([]);
    const [contentEditable, setContentEditable] = useState(false);
    const [textContent, setTextContent] = useState('Click "Enable Editing" to modify this text.');
    const [attributeClass, setAttributeClass] = useState('bg-blue-100');
    const [childElements, setChildElements] = useState([]);

    const addChange = (change) => {
        setChanges(prev => [change, ...prev].slice(0, 5));
    };

    // Handlers for different types of mutations
    const toggleEditable = () => {
        setContentEditable(!contentEditable);
    };

    const toggleClass = () => {
        setAttributeClass(prev =>
            prev === 'bg-blue-100' ? 'bg-green-100' : 'bg-blue-100'
        );
    };

    const addChild = () => {
        const id = Date.now();
        setChildElements(prev => [...prev, { id: id, text: `Child with ID: ${id}` }]);
    };

    const removeChild = (id) => {
        setChildElements(prev => prev.filter(child => child.id !== id));
    };

    const removeAllChildren = () => {
        setChildElements([]);
    }

    useEffect(() => {
        if (!contentRef.current) return;

        // Configure the observer
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                switch (mutation.type) {
                    case 'characterData':
                        addChange({
                            type: 'Text Change',
                            time: new Date().toLocaleTimeString(),
                            detail: `Text changed to: ${mutation.target.textContent}`
                        });
                        break;

                    case 'attributes':
                        addChange({
                            type: 'Attribute Change',
                            time: new Date().toLocaleTimeString(),
                            detail: `${mutation.attributeName} was modified`
                        });
                        break;

                    case 'childList':
                        const added = mutation.addedNodes.length;
                        const removed = mutation.removedNodes.length;
                        if (added || removed) {
                            addChange({
                                type: 'Structure Change',
                                time: new Date().toLocaleTimeString(),
                                detail: `Added: ${added}, Removed: ${removed} nodes`
                            });
                        }
                        break;

                    default:
                        break;
                }
            });
        });

        // Start observing with specific configuration
        observer.observe(contentRef.current, {
            characterData: true,
            attributes: true,
            childList: true,
            subtree: true
        });

        return () => observer.disconnect();
    }, []);


    return (
        <div className="w-full sm:min-w-96 max-w-2xl space-y-6">
            <div className="space-y-4">
                <h2 className="text-xl font-bold">DOM Change Tracker using Mutation Observer</h2>
                <div className="flex flex-wrap gap-3">
                    <button onClick={toggleEditable} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                        {contentEditable ? 'Disable' : 'Enable'} Editing
                    </button>
                    <button onClick={toggleClass} className="px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600">
                        Toggle Background
                    </button>
                    <button onClick={addChild} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">
                        Add Child
                    </button>
                    {(childElements.length > 0) && (
                        <button onClick={removeAllChildren} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                            Remove All Children
                        </button>
                    )}
                </div>

                {/* Observable content */}
                <div ref={contentRef} className={`p-4 border rounded space-y-4 ${attributeClass}`}>
                    <p contentEditable={contentEditable} onBlur={(e) => setTextContent(e.target.textContent)} className={`p-2 rounded border border-solid border-gray-400 focus-visible:outline-none ${contentEditable ? 'bg-white' : ''}`}>
                        {textContent}
                    </p>
                    <div className="space-y-2">
                        {childElements.map(child => (
                            <div key={child.id} className="flex items-center justify-between p-2 bg-white rounded shadow">
                                <span>{child.text}</span>
                                <button onClick={() => removeChild(child.id)} className="text-red-500 hover:text-red-700">
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="mt-6">
                <h3 className="text-lg font-semibold mb-3">Recent Changes:</h3>
                {changes.length > 0 ? (
                    <div className="space-y-2">
                        {changes.map((change, index) => (
                            <div key={index} className="flex items-start gap-2 p-3 bg-gray-50 rounded">
                                <AlertCircle className="w-5 h-5 text-blue-500 flex-shrink-0 mt-0.5" />
                                <div>
                                    <div className="flex gap-2">
                                        <span className="font-medium">{change.type}</span>
                                        <span className="text-gray-500">at {change.time}</span>
                                    </div>
                                    <p className="text-sm text-gray-600">{change.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : <p className="text-gray-500">No changes detected yet</p>}
            </div>
        </div>
    );
};

export default DOMChangeTracker;