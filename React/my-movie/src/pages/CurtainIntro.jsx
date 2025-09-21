import React, {useLayoutEffect, useState, useRef} from 'react'
import './curtainIntro.css'

export default function CurtainIntro( { duration = 1800, oncePerSession = false, onDone }) {
    const shouldShow = !oncePerSession || !sessionStorage.getItem("curtain_shown");
    const [show, setShow] = useState(shouldShow);
    const wrapperRef = useRef(null);

  useLayoutEffect(() => {
    if (!show) {
        // onDone?.()
        return
    };

     // Mark body as "curtain-active" so we can hide footer / lock scroll
    document.body.classList.add('curtain-active');

    const t = setTimeout(() => {
        // sessionStorage.setItem("curtain_shown", "1"); //control if show when refresh the page
      setShow(false);
      document.body.classList.remove('curtain-active');
      onDone?.()
    }, duration + 400); // add 400ms for fade out
    return () => {
      clearTimeout(t);
      document.body.classList.remove('curtain-active');
    }
  }, [show, duration, onDone]);

  if (!show) return null;

  return (
    <div className="curtain" ref={wrapperRef} aria-hidden>
      <div className="curtain__backdrop" />
      <div className="curtain__valance" />
      <div className="curtain__panel curtain__left" />
      <div className="curtain__panel curtain__right" />
      <div className="curtain__title">Now Showing</div>
    </div>
  );
}
