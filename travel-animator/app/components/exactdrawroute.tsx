// This func will give exact route

// const drawRoute = async () => {
  //   if (!mapRef.current) return;

  //   // Get coordinates of all markers (from, waypoints, to)
  //   const fromCoords = markersRef.current.fromMarker?.getLngLat();
  //   const toCoords = markersRef.current.toMarker?.getLngLat();
  //   const waypointCoords = markersRef.current.waypoints.map((marker) =>
  //     marker.getLngLat()
  //   );

  //   if (!fromCoords || !toCoords) return;

  //   // Combine coordinates into a route string
  //   const coordinates = [
  //     [fromCoords.lng, fromCoords.lat],
  //     ...waypointCoords.map((wp) => [wp.lng, wp.lat]),
  //     [toCoords.lng, toCoords.lat],
  //   ];

  //   const routeString = coordinates.map((coord) => coord.join(",")).join(";");

  //   // Fetch the route data
  //   const response = await fetch(
  //     `https://api.mapbox.com/directions/v5/mapbox/driving/${routeString}?geometries=geojson&access_token=${
  //       mapboxgl.accessToken
  //     }`
  //   );
  //   const data = await response.json();

  //   // Check and update route
  //   if (data.routes && data.routes.length > 0) {
  //     const route = data.routes[0].geometry;

  //     if (mapRef.current.getSource("route")) {
  //       mapRef.current.removeLayer("route");
  //       mapRef.current.removeSource("route");
  //     }

  //     mapRef.current.addSource("route", {
  //       type: "geojson",
  //       data: {
  //         type: "Feature",
  //         geometry: route,
  //         properties: {},
  //       },
  //     });

  //     mapRef.current.addLayer({
  //       id: "route",
  //       type: "line",
  //       source: "route",
  //       layout: {
  //         "line-join": "round",
  //         "line-cap": "round",
  //       },
  //       paint: {
  //         "line-color": "#FF0A0A",
  //         "line-width": 3,
  //       },
  //     });

  //     // Add click event on the route to add a draggable marker
  //     mapRef.current.on("click", "route", (e) => {
  //       const lngLat = e.lngLat;
  //       addWaypoint(lngLat);
  //     });
  //   }
  // };