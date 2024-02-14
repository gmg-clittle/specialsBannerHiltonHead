<script>
(function() {
    setTimeout(function() {
        function getModelFromQuery() {
            var urlParams = new URLSearchParams(window.location.search);
            var model = urlParams.get('model');
            if (model) {
                var make = ['Enclave', 'Envision', 'Encore GX', 'Envista'].includes(model) ? 'Buick' : 'GMC';
                console.log("Determined make:", make, "| Extracted model:", model);
                return { make: make, model: model };
            }
            return null;
        }

function checkExpirationAndProceed(brandModel) {
    var sheetName = encodeURIComponent('Hilton Head Buick GMC - Bluffton, SC');
    var apiURL = 'https://sheetdb.io/api/v1/pom19rkndxfuq/search?sheet=' + sheetName + '&Make=' + encodeURIComponent(brandModel.make) + '&Model=' + encodeURIComponent(brandModel.model);
    fetch(apiURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.length > 0 && data[0].hasOwnProperty('Expired') && data[0].Expired === 'Active' && data[0].hasOwnProperty('Status') && data[0].Status === 'Enabled') {
                setModelBanner(brandModel); // Proceed only if 'Expired' is 'Active' and 'Status' is 'Enabled'
            } else {
                console.log("Banner and disclaimer not shown due to inactive status or expiration.");
            }
        })
        .catch(function(error) {
            console.error('Error checking expiration:', error);
        });
}




        function setModelBanner(brandModel) {
            var bannerContainer = document.getElementById('banner-container');
            if (!bannerContainer) {
                console.log("Banner container not found.");
                return;
            }

var banners = {
    'Sierra 1500': {
        desktop: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-gmc-sierra-1500-hilton-head-buick-gmc.png',
        mobile: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-gmc-sierra-1500-hilton-head-buick-gmc.png',
        backgroundImage: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-gmc-sierra-1500-hilton-head-buick-gmc.jpg'
    },
    'Enclave': {
        desktop: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-buick-enclave-hilton-head-buick-gmc.png',
        mobile: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-buick-enclave-hilton-head-buick-gmc.png',
        backgroundImage: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-buick-enclave-hilton-head-buick-gmc.jpg'
    },
    'Terrain': {
        desktop: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-gmc-terrain-hilton-head-buick-gmc.png',
        mobile: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-gmc-terrain-hilton-head-buick-gmc.png',
        backgroundImage: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-gmc-terrain-hilton-head-buick-gmc.jpg'
    },
    'Yukon': {
        desktop: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-gmc-yukon-hilton-head-buick-gmc.png',
        mobile: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-gmc-yukon-hilton-head-buick-gmc.png',
        backgroundImage: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-gmc-yukon-hilton-head-buick-gmc.jpg'
    },
    'Yukon XL': {
        desktop: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-gmc-yukon-xl-hilton-head-buick-gmc.png',
        mobile: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-gmc-yukon-xl-hilton-head-buick-gmc.png',
        backgroundImage: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-gmc-yukon-xl-hilton-head-buick-gmc.jpg'
    },
    'Acadia': {
        desktop: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-gmc-acadia-hilton-head-buick-gmc.png',
        mobile: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-gmc-acadia-hilton-head-buick-gmc.png',
        backgroundImage: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-gmc-acadia-hilton-head-buick-gmc.jpg'
    },
    'Encore GX': {
        desktop: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-buick-encore-gx-hilton-head-buick-gmc.png',
        mobile: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-buick-encore-gx-hilton-head-buick-gmc.png',
        backgroundImage: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-buick-encore-gx-hilton-head-buick-gmc.jpg'
    },
    'Envision': {
        desktop: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-buick-envision-hilton-head-buick-gmc.png',
        mobile: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-buick-envision-hilton-head-buick-gmc.png',
        backgroundImage: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-buick-envision-hilton-head-buick-gmc.jpg'
    },
    'Sierra 2500 HD': {
        desktop: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-gmc-sierra-2500-hd-hilton-head-buick-gmc.png',
        mobile: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-gmc-sierra-2500-hd-hilton-head-buick-gmc.png',
        backgroundImage: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-gmc-sierra-2500-hd-hilton-head-buick-gmc.jpg'
    },
    'Envista': {
        desktop: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-buick-envista-hilton-head-buick-gmc.png',
        mobile: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-buick-envista-hilton-head-buick-gmc.png',
        backgroundImage: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-buick-envista-hilton-head-buick-gmc.jpg'
    },
    'Canyon': {
        desktop: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-gmc-canyon-hilton-head-buick-gmc.png',
        mobile: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-gmc-canyon-hilton-head-buick-gmc.png',
        backgroundImage: 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-gmc-canyon-hilton-head-buick-gmc.jpg'
    }
};

            var model = brandModel.model;
            if (banners[model]) {
                var bannerDetails = banners[model];
                bannerContainer.innerHTML = '<img class="banner-image" src="' + bannerDetails.desktop + '" alt="New ' + model + ' Banner" style="width: 100%; height: auto; display: block;">' +
                                            '<img class="mobile-banner-image" src="' + bannerDetails.mobile + '" alt="New ' + model + ' Mobile Banner" style="width: 100%; height: auto; display: none;">';

                bannerContainer.style.backgroundImage = 'url("' + bannerDetails.backgroundImage + '")';
                bannerContainer.style.backgroundRepeat = 'no-repeat';
                bannerContainer.style.backgroundSize = 'cover';
                bannerContainer.style.backgroundPosition = 'center';
                bannerContainer.style.padding = '15px';
                bannerContainer.style.marginBottom = '20px';

                var mediaQuery = window.matchMedia('(max-width: 768px)');
                var handleBannerDisplay = function(e) {
                    document.querySelector('.banner-image').style.display = e.matches ? 'none' : 'block';
                    document.querySelector('.mobile-banner-image').style.display = e.matches ? 'block' : 'none';
                };
                handleBannerDisplay(mediaQuery); // Call initially
                mediaQuery.addListener(handleBannerDisplay); // Add listener

                // New code to relocate the bannerContainer
                var targetElement = document.querySelector('.page-section[data-name="srp-wrapper-listing-inner-inventory-results"]');
                if (targetElement) {
                    targetElement.parentNode.insertBefore(bannerContainer, targetElement);
                }

                fetchDisclaimer(brandModel.make, brandModel.model);
            } else {
                console.log('Banner not found for model:', model);
            }
        }

        function fetchDisclaimer(make, model) {
            var sheetName = encodeURIComponent('Hilton Head Buick GMC - Bluffton, SC');
            var apiURL = 'https://sheetdb.io/api/v1/pom19rkndxfuq/search?sheet=' + sheetName + '&Make=' + encodeURIComponent(make) + '&Model=' + encodeURIComponent(model);
            fetch(apiURL)
                .then(function(response) {
                    return response.json();
                })
                .then(function(data) {
                    if (data.length > 0 && data[0].hasOwnProperty('Disclaimer')) {
                        var disclaimerSpan = document.getElementById('bannerDisclaimer');
                        if (disclaimerSpan) {
                            disclaimerSpan.textContent = data[0].Disclaimer;
                            disclaimerSpan.style.display = 'block';
                        }
                    } else {
                        console.log("No valid disclaimer data found for the specified make and model.");
                    }
                })
                .catch(function(error) {
                    console.error('Error fetching disclaimer:', error);
                });
        }

        var brandModel = getModelFromQuery();
        if (brandModel) {
            checkExpirationAndProceed(brandModel);
        } else {
            console.log("Make and model could not be determined from URL.");
        }
    }, 2000);
})();
</script>
