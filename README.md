# Contour Autocomplete (seg-rnn)

## API

### Get images
- Method: GET
  - On success: 200
  - On error: 404
- Download image file: `/image/<image_name>`
- Image list: `/image`
  - response.json['metadata'] =
    @code{.json}
    {
      images: [string],   // image names
    }
    @endcode

### Control points
- Method: POST (application/json)
- Request url: `/controlpoints/<image_name>`
  - request.json['controlpoints'] =
    @code{.json}
    {
      points: [           // solid control points
      {
        y: {integer},
        x: {integer},
      },{
        y: {integer},
        x: {integer},
      }]
    }
    @endcode
  - response.json['metadata'] =
    @code{.json}
    {
        points: [          // predicted control points
        {
          y: {integer},
          x: {integer},
        },{
          y: {integer},
          x: {integer},
        }]
    }
    @endcode
