import { connect } from "react-redux";
import { withRouter } from "react-router";
import ArchivesListPage from "../components/ArchivesListPage.js";
import { getArchives, getArchiveTitle } from "../../shared/selectors/archives.js";
import { createNewTab, getExtensionURL } from "../../shared/library/extension.js";
import { lockArchive, removeArchive } from "../library/messaging";

export default withRouter(
    connect(
        (state, ownProps) => ({
            archives: getArchives(state)
        }),
        {
            onArchiveClick: (archiveID, state) => () => {
                createNewTab(getExtensionURL(`setup.html#/access-archive/${archiveID}/${state}`));
            },
            onAddArchiveClick: () => () => {
                createNewTab(getExtensionURL("setup.html#/add-archive"));
            },
            onLockArchive: sourceID => dispatch => {
                return lockArchive(sourceID);
            },
            onRemoveArchive: sourceID => (dispatch, getState) => {
                const state = getState();
                const title = getArchiveTitle(state, sourceID);
                const remove = window.confirm(`Are you sure that you want to remove the vault "${title}"?`);
                if (remove) {
                    return removeArchive(sourceID);
                }
            }
        }
    )(ArchivesListPage)
);
