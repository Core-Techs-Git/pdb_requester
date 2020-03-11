const build =
  '<span style="color:#ffffff;background-color:#7f8c8d;display:inline-block;padding:6px 10px;border-radius:4px;box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);font-weight:bold;">BUILD</span>';
const documentation =
  '<span style="color:#ffffff;background-color:#9b59b6;display:inline-block;padding:6px 10px;border-radius:4px;box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);font-weight:bold;">DOCUMENTATION</span>';
const features =
  '<span style="color:#ffffff;background-color:#2ecc71;display:inline-block;padding:6px 10px;border-radius:4px;box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);font-weight:bold;">FEATURES</span>';
const bugs =
  '<span style="color:#ffffff;background-color:#e74c3c;display:inline-block;padding:6px 10px;border-radius:4px;box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);font-weight:bold;">BUGS</span>';
const enhancements =
  '<span style="color:#ecf0f1;background-color:#f1c40f;display:inline-block;padding:6px 10px;border-radius:4px;box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);font-weight:bold;">ENHANCEMENTS</span>';
const security =
  '<span style="color:#ffffff;background-color:#f39c12;display:inline-block;padding:6px 10px;border-radius:4px;box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);font-weight:bold;">SECURITY</span>';
const unavailable =
  '<span style="color:#ffffff;background-color:#2c3e50;display:inline-block;padding:6px 10px;border-radius:4px;box-shadow:0 1px 3px 0 rgba(0,0,0,.1),0 1px 2px 0 rgba(0,0,0,.06);font-weight:bold;">UNAVAILABLE</span>';
const head = `<p align="center">
  <a href="https://www.laplateforme.com/">
    <img src="https://www.laplateforme.com/cms/i?o=%2Fsites%2Fdefault%2Ffiles%2F2017-04%2Flogo_pdb_bsl-1.jpg" alt="Pdb logo" width="200">
  </a>
</p>

# PDB REQUESTER CHANGELOG`;

module.exports = {
  header: head,
  types: [
    {
      type: '🎬',
      hidden: true,
    },
    {
      type: '🎉',
      hidden: true,
    },
    {
      type: '📦',
      section: build,
    },
    {
      type: '👷',
      section: build,
    },
    {
      type: '📚',
      section: documentation,
    },
    {
      type: '🧪',
      section: security,
    },
    {
      type: '🐛',
      section: bugs,
    },
    {
      type: '🧩',
      section: 'Features',
    },
    {
      type: '💄',
      section: 'Features',
    },
    {
      type: '⚡',
      section: enhancements,
    },
    {
      type: '🔒',
      section: security,
    },
    {
      type: '🔊',
      section: security,
    },
    {
      type: '🔗',
      section: security,
    },
    {
      type: '♻️',
      section: enhancements,
    },
    {
      type: '🎨',
      section: enhancements,
    },
    {
      type: '🚧',
      section: unavailable,
    },
    {
      type: '⏳',
      section: unavailable,
    },
    {
      type: '📜',
      section: documentation,
    },
    {
      type: '👥',
      section: enhancements,
    },
  ],
  releaseCommitMessageFormat: '🎉: RELEASE {{currentTag}}',
  issueUrlFormat: 'https://redmine.laplateforme.com/redmine/issues/{{id}}',
  issuePrefixes: ['R-'],
  skip: {
    tag: true,
  },
};
