import React, {useEffect, useState, useRef} from 'react'
import './CurtainIntro.css'

export default function CurtainIntro( { duration = 1800, oncePerSession = false, onDone }) {
    const shouldShow = !oncePerSession || !sessionStorage.getItem("curtain_shown");
    const [show, setShow] = useState(shouldShow);
    const wrapperRef = useRef(null);

  useEffect(() => {
    if (!show) {
        onDone?.()
        return
    };

    const t = setTimeout(() => {
        // sessionStorage.setItem("curtain_shown", "1"); //control if show when refresh the page
      setShow(false);
      onDone?.()
    }, duration + 400); // 留一点余量等淡出
    return () => clearTimeout(t);
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
