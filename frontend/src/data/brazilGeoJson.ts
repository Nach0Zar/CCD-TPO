const brazilOutline = [
  [-73.99, -7.2],
  [-70.5, -9.8],
  [-66.6, -7.4],
  [-63.0, -2.8],
  [-60.0, 2.0],
  [-54.0, 2.7],
  [-50.0, 4.0],
  [-46.0, 0.5],
  [-38.5, -4.5],
  [-35.0, -8.0],
  [-38.0, -13.0],
  [-44.0, -22.0],
  [-47.0, -25.0],
  [-50.0, -30.0],
  [-56.0, -30.5],
  [-61.0, -26.0],
  [-65.0, -17.0],
  [-70.0, -12.0],
  [-73.99, -7.2],
];

export const brazilGeoJson = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      id: "BR",
      properties: {
        name: "Brazil",
      },
      geometry: {
        type: "Polygon",
        coordinates: [brazilOutline],
      },
    },
  ],
};

export default brazilGeoJson;
