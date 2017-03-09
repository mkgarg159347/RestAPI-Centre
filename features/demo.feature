@dev @qa
Feature: Verify that all the API's are up and running

#  Valid values are get, put, post and delete. Other kind of operations can be added on need basis.
  Scenario: SC1 GET: Verify GET POST woll get all the details
    When User sends a 'get' request get all the posts
    Then Status code for get request is 400

  Scenario: SC2 GET: Verify GET POST based on user Id get particular record
    When User sends a 'get' request with user Id to get particular record
    Then Status code for get request is 200
    And The title value is 'sunt aut facere repellat provident occaecati excepturi optio reprehenderit'

  Scenario: SC3 GET: Verify GET XML API
    When User sends a 'get' request for XML API
    Then Status code for get request is 200