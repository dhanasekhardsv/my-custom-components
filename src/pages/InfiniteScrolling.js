import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Loader2 } from 'lucide-react';


const InfiniteScrolling = () => {
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const loadMoreRef = useRef(null);

    // Memoize fetchMoreItems to prevent unnecessary recreations
    const fetchMoreItems = useCallback(async () => {
        setLoading(true);
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const newItems = Array.from({ length: 6 }, (_, i) => ({
            id: items.length + i + 1,
            imageUrl: `https://placehold.co/${300}x${200}`,
            title: `Item ${items.length + i + 1}`
        }));

        setItems(prev => [...prev, ...newItems]);
        setPage(prev => prev + 1);
        setLoading(false);
    }, [items.length]);

    useEffect(() => {
        // Store the current ref value
        const currentRef = loadMoreRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                const target = entries[0];
                if (target.isIntersecting && !loading && page < 5) {
                    fetchMoreItems();
                }
            },
            {
                root: null,
                rootMargin: '20px',
                threshold: 0.1
            }
        );

        if (currentRef) {
            observer.observe(currentRef);
        }

        // Use the stored ref value in cleanup
        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [loading, page, fetchMoreItems]);

    return (
        <div className="mx-auto">
            <h1 className="text-xl mb-3 font-semibold">Infinite Scrolling Using Intersection Observer</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map(item => (
                    <div key={item.id} className="bg-white rounded shadow-md overflow-hidden">
                        <img src={item.imageUrl} alt={item.title} className="w-full" loading="lazy" />
                        <div className="p-4">
                            <h2 className="font-semibold">{item.title}</h2>
                        </div>
                    </div>
                ))}
            </div>
            <div ref={loadMoreRef} className="flex justify-center items-center">
                {loading ? (
                    <div className="flex items-center gap-2 py-3">
                        <Loader2 className="animate-spin" />
                        <span>Loading more items...</span>
                    </div>
                ) : ((page < 5) && (<span className="text-gray-500 py-3">Scroll for more</span>))}
            </div>
        </div>
    );
}

export default InfiniteScrolling