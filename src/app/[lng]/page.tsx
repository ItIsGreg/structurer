"use client";

import StructurerBody from "./_structurer/StructurerBody";

interface StructurerProps {
  params: {
    lng: string;
  };
}

const Structurer = (props: StructurerProps) => {
  return (
    <StructurerBody
      params={{
        lng: props.params.lng,
      }}
    />
  );
};

export default Structurer;
