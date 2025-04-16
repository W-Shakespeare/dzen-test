import { useState, useRef, useEffect } from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./TextOverflowTooltip.css";

interface SmartTooltipProps {
  text: string;
}

const TextOverflowTooltip = ({ text }: SmartTooltipProps) => {
  const textRef = useRef<HTMLSpanElement>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const checkOverflow = () => {
    const el = textRef.current;
    if (el) {
      setShowTooltip(el.scrollWidth > el.clientWidth);
    }
  };

  useEffect(() => {
    checkOverflow();

    const el = textRef.current;
    if (!el) return;

    const resizeObserver = new ResizeObserver(() => {
      checkOverflow();
    });

    resizeObserver.observe(el);

    return () => {
      resizeObserver.disconnect();
    };
  }, [text]);

  return (
    <OverlayTrigger
      placement="top"
      overlay={<Tooltip id="tooltip">{text}</Tooltip>}
      show={showTooltip ? undefined : false}
    >
      <span
        ref={textRef}
        className="truncate-text"
        style={{
          cursor: showTooltip ? "pointer" : "default",
        }}
      >
        {text}
      </span>
    </OverlayTrigger>
  );
};

export default TextOverflowTooltip;
