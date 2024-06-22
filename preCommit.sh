echo "REMEMBER TO EXEC 'yarn run commit' INSTEAD OF 'git commit', PRESS ENTER TO CONTINUE OR ANY KEY TO CLOSE"

exec < /dev/tty
read gitOption

if [[ $gitOption = "" ]]; then
    exit 0
else
    exit 1
fi