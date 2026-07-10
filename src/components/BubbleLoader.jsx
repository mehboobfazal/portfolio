import { useId } from "react";

export default function BubbleLoader() {
    const id = useId().replace(/:/g, "");
    const bubbles = Array.from({ length: 3 });
    const drops = Array.from({ length: 7 });

    return (
        <>
            <style>{`
        .bl-${id}{
          display:flex;
          justify-content:space-between;
          align-items:center;
          width:12em;
          height:12em;
          filter:drop-shadow(0.9em 0.9em 4px rgba(0,0,0,0.4));
        }

        .bl-${id}-bubble{
          position:relative;
          width:3em;
          height:3em;
        }

        .bl-${id}-bubble-drop{
          width:0.125em;
          height:0.5em;
          transform:translate(-50%,-3em);
        }
        .bl-${id}-bubble-drop, .bl-${id}-bubble-drop:before{
          transform-origin:50% 0;
        }

        /* drop rotation positions (7 drops) */
        .bl-${id}-bubble-drop:nth-child(2){
          transform:translate(-50%,-3em) rotate(51.4285714286deg);
        }
        .bl-${id}-bubble-drop:nth-child(3){
          transform:translate(-50%,-3em) rotate(102.8571428571deg);
        }
        .bl-${id}-bubble-drop:nth-child(4){
          transform:translate(-50%,-3em) rotate(154.2857142857deg);
        }
        .bl-${id}-bubble-drop:nth-child(5){
          transform:translate(-50%,-3em) rotate(205.7142857143deg);
        }
        .bl-${id}-bubble-drop:nth-child(6){
          transform:translate(-50%,-3em) rotate(257.1428571429deg);
        }
        .bl-${id}-bubble-drop:nth-child(7){
          transform:translate(-50%,-3em) rotate(308.5714285714deg);
        }

        .bl-${id}-bubble:before, .bl-${id}-bubble:after, .bl-${id}-bubble-drop{
          position:absolute;
        }
        .bl-${id}-bubble:before, .bl-${id}-bubble:after, .bl-${id}-bubble-drop:before{
          animation: bl-${id}-rise-before 1.5s linear infinite;
        }
        .bl-${id}-bubble:before, .bl-${id}-bubble:after{
          border-radius:50%;
        }
        .bl-${id}-bubble:after, .bl-${id}-bubble-drop{
          top:50%;
          left:50%;
        }
        .bl-${id}-bubble:before{
          box-shadow: 0 -0.0625em 0 0.0625em #fff inset, 0 0 0 0.0625em #93c5fd inset, 0 0 0.25em 0.25em rgba(147,197,253,0.7) inset;
          transform: translate(0,4.5em) scale(0);
        }
        .bl-${id}-bubble:after{
          animation-name: bl-${id}-rise-after;
          background-image: radial-gradient(25% 10% at 50% 5%, #fff 48%, rgba(255,255,255,0) 50%);
          width: 87.5%;
          height: 87.5%;
          transform: translate(-50%,-50%) translate(0,4.5em) rotate(-45deg) scale(0);
        }
        .bl-${id}-bubble:before, .bl-${id}-bubble-drop:before{
          width:100%;
          height:100%;
        }
        .bl-${id}-bubble-drop:before{
          animation-name: bl-${id}-drop;
          background-color: #bfdbfe;
          border-radius: 0.0625em;
          transform: translateY(0) scaleY(0);
          transform-origin: 50% 0;
        }
        .bl-${id}-bubble:before, .bl-${id}-bubble:after, .bl-${id}-bubble-drop:before{
          content: "";
          display:block;
        }

        /* stagger delays to match original */
        .bl-${id}-bubble:nth-child(2):before, .bl-${id}-bubble:nth-child(2):after, .bl-${id}-bubble:nth-child(2) .bl-${id}-bubble-drop:before{
          animation-delay: 0.15s;
        }
        .bl-${id}-bubble:nth-child(3):before, .bl-${id}-bubble:nth-child(3):after, .bl-${id}-bubble:nth-child(3) .bl-${id}-bubble-drop:before{
          animation-delay: 0.3s;
        }

        @keyframes bl-${id}-rise-before{
          from{animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0); transform: translate(0,4.5em) scale(0);} 
          30%{animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1); transform: translate(0,0.75em) scale(1);} 
          60%{animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0); opacity:1; transform: translate(0,-3em) scale(1);} 
          70%, to {opacity:0; transform: translate(0,-3em) scale(0.25);} 
        }

        @keyframes bl-${id}-rise-after{
          from{animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0); transform: translate(-50%,-50%) translate(0,4.5em) rotate(-45deg) scale(0);} 
          30%{animation-timing-function: cubic-bezier(0.61, 1, 0.88, 1); transform: translate(-50%,-50%) translate(0,0.75em) rotate(-45deg) scale(1);} 
          60%{animation-timing-function: cubic-bezier(0.12, 0, 0.39, 0); opacity:1; transform: translate(-50%,-50%) translate(0,-3em) rotate(-45deg) scale(1);} 
          70%, to {opacity:0; transform: translate(-50%,-50%) translate(0,-3em) rotate(-45deg) scale(0.25);} 
        }

        @keyframes bl-${id}-drop{
          from{animation-timing-function: steps(1,end); visibility:hidden; transform: translateY(0) scaleY(1);} 
          65%{animation-timing-function: cubic-bezier(0.33,1,0.68,1); visibility:visible; transform: translateY(0) scaleY(1);} 
          80%, to { transform: translateY(400%) scaleY(0);} 
        }
      `}</style>

            <div className="flex h-screen items-center justify-center bg-gradient-to-b from-blue-900 to-blue-950">
                <div className={`bl-${id}`}>
                    {bubbles.map((_, bubbleIndex) => (
                        <div key={bubbleIndex} className={`bl-${id}-bubble`}>
                            {drops.map((_, dropIndex) => (
                                <div
                                    key={dropIndex}
                                    className={`bl-${id}-bubble-drop`}
                                    style={{
                                        transform: `translate(-50%,-3em) rotate(${dropIndex * (360 / 7)}deg)`,
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}
