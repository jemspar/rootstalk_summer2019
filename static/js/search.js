var lunrIndex,
      $results,
      pagesIndex;

  // Initialize lunrjs using our generated index file
  function initLunr(callback) {
      // First retrieve the index file
      $.getJSON("/js/lunr/PagesIndex.json")
          .done(function(index) {
              pagesIndex = index;
              console.log("index:", pagesIndex);

              // Set up lunrjs by declaring the fields we use
              // Also provide their boost level for the ranking
            lunrIndex = lunr(function() {
                  this.field("title", {
                      boost: 10
                  });
                  this.field("tags", {
                      boost: 5
                  });
                  this.field("content");

                  // ref is the result item identifier (I chose the page URL)
                  this.ref("href");

                  // Feed lunr with each file and let lunr actually index them
                  pagesIndex.forEach(function(page) {
                    if (page != null) {
                        this.add(page);
                    }
                  }, this);
              });
              console.log("index built!!!");
              callback();

          })

          .fail(function(jqxhr, textStatus, error) {
              var err = textStatus + ", " + error;
              console.error("Error getting Hugo index file:", err);
          });
  }

  // Nothing crazy here, just hook up a listener on the input field
  function initUI() {
    const query = new URLSearchParams(window.location.search);
    const searchString = query.get('q');
      $results = $("#articlegrid_container");
    //   $("#search").keyup(function() {
    //       $results.empty();

    //       // Only trigger a search when 2 chars. at least have been provided
    //       var query = $(this).val();
          console.log(searchString);
          if (searchString) {
            $("#results_title").html("Results for \"" + searchString + "\"");
          }
          

          if (searchString.length < 2) {
              return;
          }

          var results = search(searchString);
          console.log("searched lunr index.");

          renderResults(results);
      
  }

  /**
   * Trigger a search in lunr and transform the result
   *
   * @param  {String} query
   * @return {Array}  results
   */
  function search(query) {
      // Find the item in our index corresponding to the lunr one to have more info
      // Lunr result: 
      //  {ref: "/section/page1", score: 0.2725657778206127}
      // Our result:
      //  {title:"Page1", href:"/section/page1", ...}
      console.log("searching...");
      return lunrIndex.search(query).map(function(result) {
              return pagesIndex.filter(function(page) {
                  return page.href === result.ref;
              })[0];
          });
  }

  /**
   * Display the 10 first results
   *
   * @param  {Array} results to display
   */
  function renderResults(results) {
      if (!results.length) {
          return;
      }

      console.log("result(s) matched!");
      // Only show the ten first results
      results.slice(0, 10).forEach(function(result) {
          var $result = $("<div>", { class: "articlegrid_item", style: "width: 100%; flex-basis: 100%" });
          $result.append($("<h3>", {
              class: "articletype",
              text: result.type
          }));
          $result.append($("<h2>")
            .append($("<a>", {
              href: result.href,
              text: result.title
          })));
          $result.append($("<p>", {
              class: "author",
              text: "by " + result.author
          }));
          $results.append($result);
      });
  }

  $(document).ready(function() {

      initLunr(initUI);

  });