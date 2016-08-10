devise.provider('AuthIntercept', function AuthInterceptProvider() {
    /**
     * Set to true to intercept 4* (401,402,403,404,.... until 499) responses
     * All client side response errors
     */
    var interceptAuth = false;

    // The interceptAuth config function
    this.interceptAuth = function(value) {
        interceptAuth = !!value || value === void 0;
        return this;
    };

    this.$get = function($rootScope, $q) {
        // intercepting 4* (401,402,403,404,.... until 499) requests.
        return {
            responseError: function(response) {
                // Determine if the response is specifically disabling the interceptor.
                var intercept = response.config.interceptAuth;
                intercept = !!intercept || (interceptAuth && intercept === void 0);

                if (intercept && (response.status >= 400 && response.status <= 499) ){
                    var deferred = $q.defer();
                    $rootScope.$broadcast('responseError', response, deferred);
                    deferred.reject(response);
                    return deferred.promise;
                }

                return $q.reject(response);
            }
        };
    };
}).config(function($httpProvider) {
    $httpProvider.interceptors.push('AuthIntercept');
});
