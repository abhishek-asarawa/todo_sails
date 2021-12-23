/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes tell Sails what to do each time it receives a request.
 *
 * For more information on configuring custom routes, check out:
 * https://sailsjs.com/anatomy/config/routes-js
 */

module.exports.routes = {
  /***************************************************************************
   *                                                                          *
   * Make the view located at `views/homepage.ejs` your home page.            *
   *                                                                          *
   * (Alternatively, remove this and add an `index.html` file in your         *
   * `assets` directory)                                                      *
   *                                                                          *
   ***************************************************************************/
  "GET /boards": { controller: "BoardController", action: "getBoards" },
  "GET /board/:id": { controller: "BoardController", action: "getBoard" },
  "POST /board": { controller: "BoardController", action: "create" },
  "PUT /board/:id": { controller: "BoardController", action: "update" },
  "DELETE /board/:id": { controller: "BoardController", action: "delete" },

  "GET /tasks": { controller: "TaskController", action: "getTasks" },
  "POST /task": { controller: "TaskController", action: "create" },
  "PUT /task/:id": { controller: "TaskController", action: "update" },
  "DELETE /task/:id": { controller: "TaskController", action: "delete" },

  "/": { view: "pages/homepage" },

  /***************************************************************************
   *                                                                          *
   * More custom routes here...                                               *
   * (See https://sailsjs.com/config/routes for examples.)                    *
   *                                                                          *
   * If a request to a URL doesn't match any of the routes in this file, it   *
   * is matched against "shadow routes" (e.g. blueprint routes).  If it does  *
   * not match any of those, it is matched against static assets.             *
   *                                                                          *
   ***************************************************************************/
};
