#!/bin/bash
npx allure generate ./allure-results --clean
npx allure open -p 9323 ./allure-report