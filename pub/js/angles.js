const radToDeg = (r) => {
    return r * 180 / Math.PI;
}

const degToRad = (d) => {
    return d * Math.PI / 180;
}

export { radToDeg, degToRad };