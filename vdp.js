<script>
(function() {
    document.addEventListener("DOMContentLoaded", function() {
        setTimeout(function() {
            console.log("Executing script after delay.");
            var brandModel = getModelFromVDPUrl();
            if (brandModel) {
                fetchAndSetBanner(brandModel);
            } else {
                console.log("Brand and model could not be determined from URL.");
            }
        }, 3500);
    });

    function getModelFromVDPUrl() {
        var path = window.location.pathname;
        var pathSegments = path.split('/');
        if (pathSegments[1] === 'new' && pathSegments.length >= 4) {
            var combinedSegment = pathSegments[3];
            var match = combinedSegment.match(/(\d+)-([A-Za-z]+)-([A-Za-z0-9\+]+)/);
            if (match && match.length >= 4) {
                var brand = match[2];
                var modelSegment = match[3];
                var model = modelSegment.replace(/\+/g, ' ');
                console.log("Extracted brand:", brand, "| Extracted model:", model);
                return { brand: brand, model: model };
            }
        }
        return null;
    }

function fetchAndSetBanner(brandModel) {
    var sheetName = encodeURIComponent('Hilton Head Buick GMC - Bluffton, SC');
    var apiURL = 'https://sheetdb.io/api/v1/pom19rkndxfuq/search?sheet=' + sheetName + '&Make=' + encodeURIComponent(brandModel.brand) + '&Model=' + encodeURIComponent(brandModel.model);
    fetch(apiURL)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            if (data.length > 0 && data[0].hasOwnProperty("Expired") && data[0].Expired === "Active" && data[0].hasOwnProperty("Status") && data[0].Status === "Enabled") {
                setVDPModelBanner(brandModel); // Only proceed if both 'Expired' is 'Active' and 'Status' is 'Enabled'
                relocateBannerContainerForMobile();
                fetchDisclaimer(brandModel.brand, brandModel.model);
            } else {
                console.log("Banner and disclaimer not shown due to inactive status or expiration.");
            }
        })
        .catch(function(error) {
            console.error("Error fetching data:", error);
        });
}


    function setVDPModelBanner(brandModel) {
        var bannerContainer = document.getElementById('banner-container');
        if (!bannerContainer) {
            console.log("Banner container not found.");
            return;
        }

        var bannerImageUrl = 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/desktop/new-' + brandModel.brand.toLowerCase() + '-' + brandModel.model.toLowerCase().replace(/\s+/g, '-') + '-hilton-head-buick-gmc.png';
        var mobileBannerImageUrl = 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/model-overview/mobile/new-' + brandModel.brand.toLowerCase() + '-' + brandModel.model.toLowerCase().replace(/\s+/g, '-') + '-hilton-head-buick-gmc.png';
        var backgroundImageUrl = 'https://assets.garberauto.com/specials/hilton-head-buick-gmc-bluffton-sc/background/new-' + brandModel.brand.toLowerCase() + '-' + brandModel.model.toLowerCase().replace(/\s+/g, '-') + '-hilton-head-buick-gmc.jpg';

        bannerContainer.style.backgroundImage = 'url("' + backgroundImageUrl + '")';
        bannerContainer.style.backgroundRepeat = 'no-repeat';
        bannerContainer.style.backgroundSize = 'cover';
        bannerContainer.style.backgroundPosition = 'center center';
        bannerContainer.style.padding = '15px 15px';
        bannerContainer.style.marginBottom = '20px';
        bannerContainer.innerHTML = '<img class="banner-image hidden-xs" src="' + bannerImageUrl + '" alt="New ' + brandModel.model + ' Banner" style="width: 100%; height: auto;">' +
                                    '<img class="mobile-banner-image visible-xs" src="' + mobileBannerImageUrl + '" alt="New ' + brandModel.model + ' Mobile Banner" style="width: 100%; height: auto;">';
    }

    function relocateBannerContainerForMobile() {
        if (window.innerWidth <= 768) {
            var bannerContainer = document.getElementById('banner-container');
            var quickSpecsRoot = document.getElementById('quick-specs1-app-root');
            if (quickSpecsRoot && bannerContainer) {
                quickSpecsRoot.parentNode.insertBefore(bannerContainer, quickSpecsRoot.nextSibling);
                console.log("Banner container relocated for mobile.");
            } else {
                console.log("Quick specs root or banner container not found. Cannot relocate banner container for mobile.");
            }
        }
    }

    function fetchDisclaimer(brand, model) {
        var sheetName = encodeURIComponent('Hilton Head Buick GMC - Bluffton, SC');
        var apiURL = 'https://sheetdb.io/api/v1/pom19rkndxfuq/search?sheet=' + sheetName + '&Make=' + encodeURIComponent(brand) + '&Model=' + encodeURIComponent(model);
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

})();
</script>
