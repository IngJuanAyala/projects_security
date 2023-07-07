#!/bin/bash
set -e
DIR_BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"
SCRIPTS_BASE="$DIR_BASE/bash-scripts"
source "$SCRIPTS_BASE/change-directory.sh"
source "$SCRIPTS_BASE/install-dependencies.sh"
source "$SCRIPTS_BASE/validator-message.sh"
source "$SCRIPTS_BASE/execute.sh"


DIR_BASE="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

APP_NAME=$1

if [ "$APP_NAME" == '' ]; then
    validate_exit_message
fi

if [ $APP_NAME == "ceb-core-common-report-worker" ]; then
    FOLDER="$DIR_BASE/worker"
elif [ $APP_NAME == "ceb-core-common-report-api" ]; then
    FOLDER="$DIR_BASE/api"
elif [ $APP_NAME == "ceb-core-common-report-scheduler" ]; then
    FOLDER="$DIR_BASE/schedulerWorker"
else
    no_valid_app_message
fi

change_directory $FOLDER

install_dependencies

execute "cd .." "Leaving the $FOLDER directory..."

printf "\n\n${GREEN}✓ Dependencies of ${YELLOW}$APP_NAME${GREEN} installed successfully!${NC}\n\n\n"