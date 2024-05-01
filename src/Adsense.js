import React, { useEffect } from "react";

const AdSense = () => {
  useEffect(() => {
    // Load AdSense script
    (window.adsbygoogle = window.adsbygoogle || []).push({});
  }, []);
  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block", minWidth: "200px", minHeight: "200px" }}
      data-ad-client="ca-pub-2843724221280103"
      data-ad-slot="4216731899"
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
};

export default AdSense;
