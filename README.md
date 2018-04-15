# react-ts-dogs [![Build Status](https://travis-ci.org/e-r-w/react-ts-dogs.svg?branch=master)](https://travis-ci.org/e-r-w/react-ts-dogs)

A simple application to fetch 8 pictures/videos of dogs. Built with React, Typescript, Redux & Gatsbyjs

## Requirement

* nodejs 8
* yarn

## Getting started

First, install required dependencies with `yarn install`. You can get started developing by running `yarn start` and opening a browser at the specified url

## Other scripts

* `yarn lint` - run tslint
* `yarn test` - run tests
* `yarn build` - run the gatsby build

## Caveats

The Uglifyjs used under the hood with the Gatsby build doesn't seem to like Typescript's implementation of `async/await`. It wasn't used to extensively so I decided to revert back to vanilla promises - not worth the time spent chasing down the problem.

Gatsby also produces a page for every `.tsx/.jsx` file in pages, so you can't put the test suite beside the original file without hooking into the Gatsby build pipeline to ignore test files - again, not worth the time spent chasing down the problem.
