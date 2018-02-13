export const selectListingAction = (listing) => {
    console.log("action...."+ listing.address)
    return {
        type: "LISTING_SELECTED",
        payload: listing
    }
};