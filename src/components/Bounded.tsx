import React from "react";
 
interface BoundedProps {
    as?: React.ElementType;
    className?: string;
    children: React.ReactNode;
}


const Bounded = React.forwardRef<HTMLDivElement, BoundedProps>(
    ({as: Component = "section", className, children, ...props}, ref) => {
        return (
            <Component ref={ref} {...props}
            className={"px-4 py-10 md:px-6 md:py-14 lg:py-16"}>
                <div className="mx-auto w-full max-w-7xl">
                    {children}
                </div>
            </Component>
        );
    }
);

Bounded.displayName = "Bounded";
export default Bounded;