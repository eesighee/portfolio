You don't need any new API changes right now. The share link route already does what you need:                                                                                              
                                                                                                                                                                                              
  GET /share/{linkId}/assets — public, no auth, returns signed CloudFront URLs.                                                                                                               
   
  So the workflow is:                                                                                                                                                                         
                  
  1. Create a "Portfolio" gallery in LumaVue with the images you want to showcase
  2. Create a share link for it (no password, no expiry)
  3. Your portfolio site calls GET /share/{linkId}/assets client-side to get fresh signed URLs on each page load

  No new endpoints, no new Lambda code. The other instance can proceed with the Phase 1/Phase 2 plan using that existing route. Just pass it the linkId once you create the share link.