digital.lafayette.edu ui [![Build Status](https://travis-ci.org/LafayetteCollegeLibraries/digital.lafayette.edu.svg?branch=master)](https://travis-ci.org/LafayetteCollegeLibraries/digital.lafayette.edu) [![Coverage Status](https://coveralls.io/repos/github/LafayetteCollegeLibraries/digital.lafayette.edu/badge.svg?branch=master)](https://coveralls.io/github/LafayetteCollegeLibraries/digital.lafayette.edu?branch=master)
========================

Proof-of-concept [React][1] / [Redux][2] front-end for [Blacklight][3]. This
takes the path begun by [metadb-ui][4], but strips out the metadata-editing
components to act solely as a view-layer (with some search-related state
management).

**This project is currently on hold** as we move towards a more traditional
approach using [Hyrax][5]/[Hyku][6] - Blacklight - [Spotlight][7].

See [LafayetteCollegeLibraries/lafayette-preserve][8] for the [Sufia][9]-based
backend.

set-up
------

```
git clone https://github.com/LafayetteCollegeLibraries/digital.lafayette.edu
cd digital.lafayette.edu
npm install
API_BASE_URL="http://instance/of/lafayette-preserve" npm run dev
```

[1]: https://facebook.github.io/react
[2]: http://redux.js.org
[3]: http://projectblacklight.org
[4]: https://github.com/LafayetteCollegeLibraries/metadb-ui
[5]: http://hyr.ax/
[6]: http://hydrainabox.projecthydra.org/
[7]: http://spotlight.projectblacklight.org/
[8]: https://github.com/LafayetteCollegeLibraries/lafayette-preserve
[9]: http://sufia.io
