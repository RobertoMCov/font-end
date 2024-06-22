const tasks = arr => arr.join(' && ')

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      'bash ./preCommit.sh'
    ])
  }
}