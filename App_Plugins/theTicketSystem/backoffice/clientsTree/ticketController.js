angular.module("umbraco").controller("ticketController",
    function ($scope, $routeParams, $window, ticketResource, ticketTextResource, clientResource, notificationsService, navigationService, userService, customUserService) {
        $scope.loaded = false; // set page not finished loading

        clientResource.getAll().then(
                function (clientResponse) {
                    $scope.clientList = clientResponse.data;
                }
            );

        customUserService.getAll().then(
            function (cUSResponse) {
                $scope.adminList = cUSResponse.data;
            }
        );

        // check if the parameter id is given
        if ($routeParams.id == -1) {
            $scope.ticket = {};
        } else {
            // Get ticket from database with the id given as parameter
            ticketResource.getById($routeParams.id).then(
                function (response) {
                    $scope.ticket = response.data; // save ticket into scope
                    // get all texts of the ticket
                    ticketTextResource.getByTicketId($routeParams.id).then(
                        function (response) {
                            var textList = response.data; // save texts in scope model
                            for (var i = 0; i < textList.length; i++) {
                                if (textList[i].isAdmin == true) {
                                    // Author = Admin
                                    for (var j = 0; j < $scope.adminList.length; j++) {
                                        if ($scope.adminList[j].Id == textList[i].fiAdmin) {
                                            textList[i].author = $scope.adminList[j].Name + ": ";
                                        }
                                    }
                                } else {
                                    // Author = Client
                                    for (var j = 0; j < $scope.clientList.length; j++) {
                                        if ($scope.clientList[j].Id == textList[i].fiClient) {
                                            textList[i].author = $scope.clientList[j].Name + ": ";
                                        }
                                    }
                                }
                            }
                            $scope.textList = textList;
                        }
                    );

                    // get current user
                    userService.getCurrentUser().then(
                        function (userResponse) {
                            $scope.user = userResponse;
                        }
                    );
                    clientResource.getById($scope.ticket.fiClient).then(
                        function (clientResponse) {
                            $scope.ticketOwner = clientResponse.data;
                        }
                    );
                }
            );

            // create the ticketText model
            var date = (new Date()).toLocaleString();
            $scope.ticketText = { Id: -1, Text: "", fiClient: 2, fiAdmin: $scope.user.id, isAdmin: true, fiTicket: parseInt($routeParams.id), createTS: date, modifyTS: date };

            $scope.client = { Id: 2 };

            $scope.loaded = true; // set page as loaded
        }

        // function to save the new TicketText into the db
        $scope.save = function (ticketText) {
            // save the ticketText
            ticketTextResource.save(ticketText).then(
                function (response) {
                    $scope.ticketText = response.data;
                    $scope.ticketTextForm.$dirty = false; // notify umbraco that all data are saved from the form
                    notificationsService.success("Successfully saved!"); // show a success message (umbraco style)
                    $window.location.href = "#/theTicketSystem/clientsTree/edit/" + $scope.client.Id; // redirect to the ticketList
                }
            );
        }
    });