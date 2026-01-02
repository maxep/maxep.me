import React, { useState, useEffect } from "react";
import { Icon } from "@chakra-ui/react";
import { BsStarFill } from "react-icons/bs";

export type ModernRatingProps = {
  initialRating?: number;
  readonly?: boolean;
  emptySymbol?: React.ReactElement;
  fullSymbol?: React.ReactElement;
  placeholderSymbol?: React.ReactElement;
  onChange?: (rating: number) => void;
};

const Rating = (props: ModernRatingProps): React.ReactElement => {
  const {
    initialRating = 0,
    readonly = false,
    emptySymbol = <Icon as={BsStarFill} color="#CBD5E0" />,
    fullSymbol = <Icon as={BsStarFill} color="#FF9000" />,
    placeholderSymbol = <BsStarFill color="#CBD5E0" />,
    onChange,
  } = props;

  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);

  // Update rating when initialRating prop changes
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (value: number) => {
    if (!readonly) {
      setRating(value);
      if (onChange) onChange(value);
    }
  };

  const handleMouseEnter = (value: number) => {
    if (!readonly) setHoverRating(value);
  };

  const handleMouseLeave = () => {
    if (!readonly) setHoverRating(0);
  };

  const getSymbol = (index: number) => {
    const currentValue = hoverRating || rating;

    if (index <= currentValue) return fullSymbol;
    if (index <= initialRating) return placeholderSymbol;
    return emptySymbol;
  };

  return (
    <div style={{ display: "flex", cursor: readonly ? "default" : "pointer" }}>
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          onClick={() => handleClick(index)}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={{ marginRight: "4px" }}
        >
          {getSymbol(index)}
        </div>
      ))}
    </div>
  );
};

export default Rating;
