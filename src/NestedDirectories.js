import React from 'react';
import ReactDOM from 'react-dom';
import Moment from 'moment';
import './css/directories.css';

import FileBrowser from 'react-keyed-file-browser';

export default class NestedDirectories extends React.Component {

    state = {
        files: [ 
            {
                key: 'project1/pictures/cell1.tiff',
                modified: +Moment().subtract(1, 'hours'),
                size: 1.5 * 1024 * 1024,
            },
            {
                key: 'project1/pictures/cell2.tiff',
                modified: +Moment().subtract(2, 'days'),
                size: 700 * 1024 * 1024,
            },
            {
                key: 'project1/data/data.svg',
                modified: +Moment().subtract(13, 'days'),
                size: 9.4 * 1024 * 1024,
            },
            {
                key: 'project2/pictures/cell1.tiff',
                modified: +Moment().subtract(2, 'minutes'),
                size: 4 * 1024 * 1024,
            },
            {
                key: 'project2/data/data.svg',
                modified: +Moment().subtract(3, 'minutes'),
                size: 1.5 * 1024 * 1024,
            },
            {
                key: 'readme.md',
                modified: +Moment().subtract(200, 'years'),
                size: 1000 * 1024,
            },
        ],
    }

    handleCreateFolder = (key) => {
        this.setState(state => {
            state.files = state.files.concat([{
                key:key
            }])
            return state
        })
    }

    handleCreateFiles = (files, prefix) => {
        this.setState(state => {
          const newFiles = files.map((file) => {
            let newKey = prefix
            if (prefix !== '' && prefix.substring(prefix.length - 1, prefix.length) !== '/') {
              newKey += '/'
            }
            newKey += file.name
            return {
              key: newKey,
              size: file.size,
              modified: +Moment(),
            }
          })
          const uniqueNewFiles = []
          newFiles.map((newFile) => {
            let exists = false
            state.files.map((existingFile) => {
              if (existingFile.key === newFile.key) {
                exists = true
              }
            })
            if (!exists) {
              uniqueNewFiles.push(newFile)
            }
          })
          state.files = state.files.concat(uniqueNewFiles)
          return state
        })
      }

      handleRenameFolder = (oldKey, newKey) => {
        this.setState(state => {
          const newFiles = []
          state.files.map((file) => {
            if (file.key.substr(0, oldKey.length) === oldKey) {
              newFiles.push({
                ...file,
                key: file.key.replace(oldKey, newKey),
                modified: +Moment(),
              })
            } else {
              newFiles.push(file)
            }
          })
          state.files = newFiles
          return state
        })
      }

      handleRenameFile = (oldKey, newKey) => {
        this.setState(state => {
          const newFiles = []
          state.files.map((file) => {
            if (file.key === oldKey) {
              newFiles.push({
                ...file,
                key: newKey,
                modified: +Moment(),
              })
            } else {
              newFiles.push(file)
            }
          })
          state.files = newFiles
          return state
        })
      }

      handleDeleteFolder = (folderKey) => {
        this.setState(state => {
          const newFiles = []
          state.files.map((file) => {
            if (file.key.substr(0, folderKey.length) !== folderKey) {
              newFiles.push(file)
            }
          })
          state.files = newFiles
          return state
        })
      }

      handleDeleteFile = (fileKey) => {
        this.setState(state => {
          const newFiles = []
          state.files.map((file) => {
            if (file.key !== fileKey) {
              newFiles.push(file)
            }
          })
          state.files = newFiles
          return state
        })
      }

    render() {
        return( 
            <FileBrowser
                files={this.state.files}
                onCreateFolder={this.handleCreateFolder}
                onCreateFiles={this.handleCreateFiles}
                onMoveFolder={this.handleRenameFolder}
                onMoveFile={this.handleRenameFile}
                onRenameFolder={this.handleRenameFolder}
                onRenameFile={this.handleRenameFile}
                onDeleteFolder={this.handleDeleteFolder}
                onDeleteFile={this.handleDeleteFile}
            />
        )
    }
}