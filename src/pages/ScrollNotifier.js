import React, { useRef } from "react";
import { useToast } from "../hooks/useToast";

const ScrollNotifier = () => {
    const { showToast } = useToast();
    const containerRef = useRef(null);
    const tolerance = 1;

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            // scrollTop: It tells you how far the top of the content has been scrolled from its initial position.
            // scrollHeight: It tells you how much content there is in total, including both visible and invisible content. When the content overflows the container, scrollHeight will be greater than clientHeight.
            // clientHeight: It represents the visible height of the element. It helps you know how much of the content is currently visible within the container (the viewport height).
            console.log(scrollTop, scrollHeight, clientHeight);

            // Tolerance value to avoid floating-point issues

            // Check if the user has scrolled to the bottom - (scrollTop + clientHeight === scrollHeight)
            if (scrollTop + clientHeight >= scrollHeight - tolerance) {
                showToast("You have reached the bottom of the container!", "info", 5000);
            }

            // Check if the user has scrolled to the top - (scrollTop === 0)
            if (scrollTop <= tolerance) {
                showToast("You have reached the top of the container!", "info", 5000);
            }
        }
    };
    const scrollToBottom = () => {
        if (containerRef.current) {
            const { scrollHeight, clientHeight } = containerRef.current;
            containerRef.current.scrollTop = scrollHeight - clientHeight - tolerance;
        }
    }
    const scrollToTop = () => {
        if (containerRef.current) {
            containerRef.current.scrollTop = 0;
        }
    }

    return (
        <div className="w-full h-72 sm:w-96 sm:h-96 overflow-y-auto rounded shadow-xl bg-slate-100 p-3" ref={containerRef} onScroll={handleScroll} >
            <button type="button" className="border-0 bg-gray-500 text-white px-2 py-1 rounded" onClick={scrollToBottom}>Go To Bottom</button>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec
                venenatis elit. Quisque vitae neque quis velit facilisis tincidunt.
                Pellentesque habitant morbi tristique senectus et netus et malesuada
                fames ac turpis egestas. Ut volutpat, nunc id egestas dapibus, odio est
                placerat purus, ut blandit purus arcu sed turpis. Etiam faucibus
                ultrices justo sit amet congue. Suspendisse potenti. Donec mollis velit
                et justo posuere, non euismod magna volutpat. Ut fermentum lorem at
                felis dapibus, nec mollis ligula tincidunt. Suspendisse potenti. Fusce
                volutpat auctor nulla nec scelerisque. Integer accumsan convallis odio,
                in vehicula erat luctus sit amet. Etiam convallis purus nec magna
                pharetra, eget suscipit est interdum. Cras consequat ligula sed neque
                consectetur, vel facilisis lorem iaculis.
            </p>
            <p>
                Integer convallis elit at tincidunt iaculis. Proin tincidunt dapibus
                arcu. Sed vestibulum purus sed felis convallis fermentum. Phasellus
                laoreet, arcu sed convallis gravida, felis orci auctor lectus, a
                fringilla tortor turpis a lectus. Nullam aliquam interdum arcu, in
                eleifend urna hendrerit vel. Donec euismod metus sed purus pharetra, id
                dictum elit pretium. Pellentesque pretium nisl in fermentum luctus.
                Nullam ornare nisl ut nisi facilisis dictum.
            </p>
            <p>
                Mauris eleifend ipsum a neque ultricies, sit amet congue risus mattis.
                Suspendisse a viverra eros, id varius mi. Integer quis lectus vitae
                augue tincidunt laoreet. Sed feugiat dui id arcu eleifend fringilla.
                Integer in mi elit. Donec molestie at metus quis tristique. Sed
                volutpat tincidunt tortor, at cursus mauris ultrices vel. Nulla
                facilisi. Proin vitae metus sit amet eros euismod fringilla nec nec
                metus. Aenean venenatis, ligula vel malesuada congue, eros nisi
                facilisis justo, eget gravida lacus justo non nisl. Suspendisse potenti.
            </p>
            <button type="button" className="border-0 bg-gray-500 text-white px-2 py-1 rounded" onClick={scrollToTop}>Go To Top</button>
        </div>
    );
};

export default ScrollNotifier;