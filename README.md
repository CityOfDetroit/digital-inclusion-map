# digital-inclusion-map
Map to assist residents find public wifi and digital training across the city.

## Getting Started

This project was created using:
    [Mapbox](https://docs.mapbox.com/mapbox-gl-js/api/) for web map rendering.
    [Parcel](https://parceljs.org/) as a web application bundler.

## Setup Local Environment.

1. Download the repo.
    ```
    $ git clone git@github.com:CityOfDetroit/digital-inclusion-map.git
    ```
2. Install node dependencies.

    ```
    $ npm install
    ```

3. Run local instance.
    ```
    $ parcel index.html
    ```

## Build production version.

1. Go to `dis` folder and delete content.

2. Run
    ```
    $ parcel build index.html --public-url '.' --no-cache
    ```

3. Copy `dist` content to production location.

## Resources

* SLACK - #webteam
* GitHub - https://github.com/CityOfDetroit/digital-inclusion-map