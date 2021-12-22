import React, { useState } from 'react';
import Image from 'next/image';
import { useEffect } from 'react';

const NextImage = (props) => {
    
    let fallbackSrc = "/Fallback.png"
    const { src, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    useEffect(() => {
        setImgSrc(src)
    }, [src])

    return (
        <Image
            {...rest}
            src={imgSrc ? imgSrc : fallbackSrc}
            onError={() => {
                setImgSrc(fallbackSrc);
            }}
            placeholder="blur"
            blurDataURL="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg=="
        />
    );
};

export default NextImage;