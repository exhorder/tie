// Copyright 2017 The TIE Authors. All Rights Reserved.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS-IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * @fileoverview Factory for creating new frontend instances of FeedbackDetails
 * domain objects.
 */

tie.factory('FeedbackDetailsObjectFactory', [
  'FEEDBACK_CATEGORIES', function(FEEDBACK_CATEGORIES) {
    /**
     * Feedback objects encapsulate the personalized feedback that is used to
     * provide constructive feedback to the user.
     */

    /**
     * Constructor for FeedbackDetails
     *
     * @param {string} feedbackCategory The category of the feedback. Must be
     *    a valid entry in FEEDBACK_CATEGORIES.
     * @param {string|null} errorString The error message.
     * @param {language|null} language The language that the student's code is
     *    written in, if applicable.
     * @param {*|null} errorInput The specific input that caused the error, if
     *    applicable.
     * @param {boolean} languageUnfamiliarityFeedbackIsNeeded Whether we need
     *    to append a feedback paragraph prompting the user to consult
     *    language-specific references.
     * @param {number} taskIndex The index of the task that failed, if
     *    applicable.
     * @param {number} specificTestIndex The index of the "specific test" that
     *    failed, if applicable.
     * @param {Array<string>} testMessages The list of messages corresponding
     *    to specific feedback, if applicable.
     * @param {number} messageIndex The index of the message to use, if
     *    applicable.
     * @param {TestCase} testCase The first-failing test case, if applicable.
     * @param {string} testSuiteId The ID of the test suite containing the
     *    first-failing test case, if applicable.
     * @param {number} testCaseIndex The index of the first-failing test case
     *    (relative to its suite), if applicable.
     * @param {*} observedOutput Actual output from running the user's code on
     *    the failing test case, if applicable.
     * @param {string} expectedPerformance A string describing the expected
     *    performance of the code (e.g. linear/quadratic), if applicable.
     *
     * @constructor
     */
    var FeedbackDetails = function(
        feedbackCategory, errorString, language, errorInput,
        languageUnfamiliarityFeedbackIsNeeded,
        taskIndex, specificTestIndex, testMessages, messageIndex,
        testCase, testSuiteId, testCaseIndex, observedOutput,
        expectedPerformance) {
      if (!FEEDBACK_CATEGORIES.hasOwnProperty(feedbackCategory)) {
        throw Error('Invalid feedback category: ' + feedbackCategory);
      }

      /**
       * Records the category corresponding to this feedback.
       *
       * @type {string}
       * @private
       */
      this._feedbackCategory = feedbackCategory;

      /**
       * A string with the error message for this feedback.
       *
       * Should be null if feedback category is not SYNTAX_ERROR or
       * RUNTIME_ERROR.
       *
       * @type {string|null}
       * @private
       */
      this._errorString = errorString || null;

      /**
       * A string with the language of the code that resulted in this feedback.
       *
       * Should be null if feedback category is not SYNTAX_ERROR or
       * RUNTIME_ERROR.
       *
       * @type {string|null}
       * @private
       */
      this._language = language || null;

      /**
       * A string with the error input that resulted in this feedback.
       *
       * Should be null if feedback category is not RUNTIME_ERROR.
       *
       * @type {*|null}
       * @private
       */
      this._errorInput = errorInput || null;

      /**
       * Whether to append language unfamiliarity feedback to what is shown
       * to the student.
       *
       * @type {boolean}
       * @private
       */
      this._languageUnfamiliarityFeedbackIsNeeded = (
        languageUnfamiliarityFeedbackIsNeeded || false);

      /**
       * The index of the task containing the first failing test.
       *
       * Should be null if feedback category is not KNOWN_BUG_FAILURE or
       * SUITE_LEVEL_FAILURE.
       *
       * @type {number}
       * @private
       */
      this._taskIndex = angular.isNumber(taskIndex) ? taskIndex : null;

      /**
       * The index of the specific test that caused the buggy-output or
       * suite-level checks to fail.
       *
       * Should be null if feedback category is not KNOWN_BUG_FAILURE or
       * SUITE_LEVEL_FAILURE.
       *
       * @type {number}
       * @private
       */
      this._specificTestIndex = specificTestIndex || null;

      /**
       * The list of feedback messages corresponding to buggy-output or
       * suite-level feedback that is applicable to the student's code.
       *
       * Should be null if feedback category is not KNOWN_BUG_FAILURE or
       * SUITE_LEVEL_FAILURE.
       *
       * @type {Array<string>}
       * @private
       */
      this._testMessages = testMessages || null;

      /**
       * The index of the specific feedback message in this._testMessages to
       * use.
       *
       * Should be null if feedback category is not KNOWN_BUG_FAILURE or
       * SUITE_LEVEL_FAILURE.
       *
       * @type {number}
       * @private
       */
      this._messageIndex = (
        angular.isNumber(messageIndex) ? messageIndex : null);

      /**
       * The first failing test case.
       *
       * Should be null if feedback category is not INCORRECT_OUTPUT_FAILURE.
       *
       * @type {TestCase}
       * @private
       */
      this._testCase = testCase || null;

      /**
       * The ID of the test suite containing first failing test case.
       *
       * Should be null if feedback category is not INCORRECT_OUTPUT_FAILURE.
       *
       * @type {string}
       * @private
       */
      this._testSuiteId = testSuiteId || null;

      /**
       * The index of the first failing test case (relative to its test suite).
       *
       * Should be null if feedback category is not INCORRECT_OUTPUT_FAILURE.
       *
       * @type {number}
       * @private
       */
      this._testCaseIndex = (
        angular.isNumber(testCaseIndex) ? testCaseIndex : null);

      /**
       * The actual output from running the user's code on the first failing
       * test case.
       *
       * Should be null if feedback category is not INCORRECT_OUTPUT_FAILURE.
       *
       * @type {*}
       * @private
       */
      this._observedOutput = observedOutput || null;

      /**
       * A string describing the expected performance of the user's code (e.g.
       * linear/quadratic).
       *
       * Should be null if feedback category is not PERFORMANCE_TEST_FAILURE.
       *
       * @type {string}
       * @private
       */
      this._expectedPerformance = expectedPerformance || null;
    };

    // Instance methods.
    /**
     * A getter for the _feedbackCategory property.
     * This function should return the category which corresponds to this
     * feedback.
     *
     * @returns {string}
     */
    FeedbackDetails.prototype.getFeedbackCategory = function() {
      return this._feedbackCategory;
    };

    /**
     * A getter for the _errorString property.
     * This function should return the error string.
     *
     * @returns {string}
     */
    FeedbackDetails.prototype.getErrorString = function() {
      if (
          this._feedbackCategory !== FEEDBACK_CATEGORIES.SYNTAX_ERROR &&
          this._feedbackCategory !== FEEDBACK_CATEGORIES.RUNTIME_ERROR) {
        throw Error('Non-syntax or runtime errors have no error string.');
      }
      return this._errorString;
    };

    /**
     * A getter for the _language property.
     * This function should return the language that the student's code is
     * written in.)
     *
     * @returns {string}
     */
    FeedbackDetails.prototype.getLanguage = function() {
      if (
          this._feedbackCategory !== FEEDBACK_CATEGORIES.SYNTAX_ERROR &&
          this._feedbackCategory !== FEEDBACK_CATEGORIES.RUNTIME_ERROR) {
        throw Error('Non-syntax or runtime errors have no language property.');
      }
      return this._language;
    };

    /**
     * A getter for the _errorInput property.
     * This function should return the specific input that caused the student's
     * code to fail.
     *
     * @returns {*}
     */
    FeedbackDetails.prototype.getErrorInput = function() {
      if (this._feedbackCategory !== FEEDBACK_CATEGORIES.RUNTIME_ERROR) {
        throw Error('Non-runtime errors have no error input.');
      }
      return angular.copy(this._errorInput);
    };

    /**
     * A getter for the _languageUnfamiliarityFeedbackIsNeeded property.
     * This function should return whether we need to append a "consult
     * language reference" message to the feedback we provide.
     *
     * @returns {boolean}
     */
    FeedbackDetails.prototype.isLanguageUnfamiliarityFeedbackNeeded =
      function() {
        return this._languageUnfamiliarityFeedbackIsNeeded;
      };

    /**
     * A getter for the failing task index.
     *
     * @returns {number}
     */
    FeedbackDetails.prototype.getTaskIndex = function() {
      if (this._feedbackCategory !== FEEDBACK_CATEGORIES.KNOWN_BUG_FAILURE &&
          this._feedbackCategory !== FEEDBACK_CATEGORIES.SUITE_LEVEL_FAILURE) {
        throw Error('Non-specific errors have no task index.');
      }
      return this._taskIndex;
    };

    /**
     * A getter for the "specific test" index corresponding to buggy-output or
     * suite-level feedback.
     *
     * @returns {number}
     */
    FeedbackDetails.prototype.getSpecificTestIndex = function() {
      if (this._feedbackCategory !== FEEDBACK_CATEGORIES.KNOWN_BUG_FAILURE &&
          this._feedbackCategory !== FEEDBACK_CATEGORIES.SUITE_LEVEL_FAILURE) {
        throw Error('Non-specific errors have no specific test index.');
      }
      return this._specificTestIndex;
    };

    /**
     * A getter for the message index used for specific feedback.
     *
     * @returns {number}
     */
    FeedbackDetails.prototype.getMessageIndex = function() {
      if (this._feedbackCategory !== FEEDBACK_CATEGORIES.KNOWN_BUG_FAILURE &&
          this._feedbackCategory !== FEEDBACK_CATEGORIES.SUITE_LEVEL_FAILURE) {
        throw Error('Non-specific errors have no feedback message index.');
      }
      return this._messageIndex;
    };

    /**
     * A getter for the feedback message for specific feedback.
     *
     * @returns {string}
     */
    FeedbackDetails.prototype.getMessage = function() {
      if (this._feedbackCategory !== FEEDBACK_CATEGORIES.KNOWN_BUG_FAILURE &&
          this._feedbackCategory !== FEEDBACK_CATEGORIES.SUITE_LEVEL_FAILURE) {
        throw Error('Non-specific errors have no feedback message.');
      }
      return this._testMessages[this._messageIndex];
    };

    /**
     * A getter for the first failing test case for incorrect-output feedback.
     *
     * @returns {TestCase}
     */
    FeedbackDetails.prototype.getTestCase = function() {
      if (this._feedbackCategory !==
          FEEDBACK_CATEGORIES.INCORRECT_OUTPUT_FAILURE) {
        throw Error('Non-incorrect-output errors have no test case.');
      }
      return this._testCase;
    };

    /**
     * A getter for the ID of the suite containing the first failing test case
     * for incorrect-output feedback.
     *
     * @returns {string}
     */
    FeedbackDetails.prototype.getTestSuiteId = function() {
      if (this._feedbackCategory !==
          FEEDBACK_CATEGORIES.INCORRECT_OUTPUT_FAILURE) {
        throw Error('Non-incorrect-output errors have no test suite ID.');
      }
      return this._testSuiteId;
    };

    /**
     * A getter for the index of the first failing test case for
     * incorrect-output feedback.
     *
     * @returns {number}
     */
    FeedbackDetails.prototype.getTestCaseIndex = function() {
      if (this._feedbackCategory !==
          FEEDBACK_CATEGORIES.INCORRECT_OUTPUT_FAILURE) {
        throw Error('Non-incorrect-output errors have no test case index.');
      }
      return this._testCaseIndex;
    };

    /**
     * A getter for the observed output for the first failing test case for
     * incorrect-output feedback.
     *
     * @returns {*}
     */
    FeedbackDetails.prototype.getObservedOutput = function() {
      if (this._feedbackCategory !==
          FEEDBACK_CATEGORIES.INCORRECT_OUTPUT_FAILURE) {
        throw Error('Non-incorrect-output errors have no observed output.');
      }
      return angular.copy(this._observedOutput);
    };

    /**
     * A getter for the observed output for the first failing test case for
     * incorrect-output feedback.
     *
     * @returns {string}
     */
    FeedbackDetails.prototype.getExpectedPerformance = function() {
      if (this._feedbackCategory !==
          FEEDBACK_CATEGORIES.PERFORMANCE_TEST_FAILURE) {
        throw Error(
          'Non-performance-failure errors have no expected performance.');
      }
      return angular.copy(this._expectedPerformance);
    };


    // Static class methods.
    FeedbackDetails.createTimeLimitErrorFeedbackDetails = function() {
      return new FeedbackDetails(FEEDBACK_CATEGORIES.TIME_LIMIT_ERROR);
    };

    FeedbackDetails.createStackExceededFeedbackDetails = function() {
      return new FeedbackDetails(FEEDBACK_CATEGORIES.STACK_EXCEEDED_ERROR);
    };

    FeedbackDetails.createMemoryLimitErrorFeedbackDetails = function() {
      return new FeedbackDetails(FEEDBACK_CATEGORIES.MEMORY_LIMIT_ERROR);
    };

    FeedbackDetails.createServerErrorFeedbackDetails = function() {
      return new FeedbackDetails(FEEDBACK_CATEGORIES.SERVER_ERROR);
    };

    FeedbackDetails.createRuntimeErrorFeedbackDetails = function(
        errorString, language, errorInput,
        languageUnfamiliarityFeedbackIsNeeded) {
      return new FeedbackDetails(
        FEEDBACK_CATEGORIES.RUNTIME_ERROR,
        errorString,
        language,
        errorInput,
        languageUnfamiliarityFeedbackIsNeeded);
    };

    FeedbackDetails.createSyntaxErrorFeedbackDetails = function(
        errorString, language, languageUnfamiliarityFeedbackIsNeeded) {
      return new FeedbackDetails(
        FEEDBACK_CATEGORIES.SYNTAX_ERROR,
        errorString,
        language,
        null,
        languageUnfamiliarityFeedbackIsNeeded);
    };

    FeedbackDetails.createBuggyOutputFeedbackDetails = function(
        taskIndex, specificTestIndex, testMessages, messageIndex) {
      return new FeedbackDetails(
        FEEDBACK_CATEGORIES.KNOWN_BUG_FAILURE, null, null, null, null,
        taskIndex, specificTestIndex, testMessages, messageIndex);
    };

    FeedbackDetails.createSuiteLevelFeedbackDetails = function(
        taskIndex, specificTestIndex, testMessages, messageIndex) {
      return new FeedbackDetails(
        FEEDBACK_CATEGORIES.SUITE_LEVEL_FAILURE, null, null, null, null,
        taskIndex, specificTestIndex, testMessages, messageIndex);
    };

    FeedbackDetails.createIncorrectOutputFeedbackDetails = function(
        testCase, testSuiteId, testCaseIndex, observedOutput) {
      return new FeedbackDetails(
        FEEDBACK_CATEGORIES.INCORRECT_OUTPUT_FAILURE, null, null, null, null,
        null, null, null, null, testCase, testSuiteId, testCaseIndex,
        observedOutput);
    };

    FeedbackDetails.createPerformanceFeedbackDetails = function(
        expectedPerformance) {
      return new FeedbackDetails(
        FEEDBACK_CATEGORIES.PERFORMANCE_TEST_FAILURE, null, null, null, null,
        null, null, null, null, null, null, null, null, expectedPerformance);
    };

    FeedbackDetails.createSuccessFeedbackDetails = function() {
      return new FeedbackDetails(FEEDBACK_CATEGORIES.SUCCESSFUL);
    };

    return FeedbackDetails;
  }
]);
