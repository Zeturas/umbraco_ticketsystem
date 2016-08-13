angular.module("umbraco").controller("Clients.ClientEditController", 
    function ($scope, $routeParams, clientResource, ticketResource,notificationsService, $window) {
        $scope.loaded = false;
        $scope.ticketLoaded = false;

        if ($routeParams.id == -1) {
            $scope.client = {};
            $scope.loaded = true;
        } else {
            // get Person id -> service
            clientResource.getById($routeParams.id).then(
                function (response) {
                    $scope.client = response.data;
                    $scope.loaded = true;
                });

            ticketResource.getByClientId($routeParams.id).then(
                function (response) {
                    $scope.tickets = response.data;
                    $scope.ticketLoaded = true;
                }
            );
        }

        $scope.save = function (client) {
            clientResource.save(client).then(
                function (response) {
                    $scope.client = response.data;

                    notificationsService.success("Success", client.Name + "has been saved");
                });
        };

        $scope.showTicket = function (id) {
            $window.location.href = "#/theTicketSystem/clientsTree/ticketView/" + id;
        }
    });