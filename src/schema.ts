export const schema = {
    source: {
        name: 'yuval niran',
        age: 'string',
        metadata: {
            creationDate: '2017-02-19',
            imageType: 'string',
            width: '54',
            length: 'number',
        }
    },
    actions: [
        {
            action: 'SPLIT',
            field: 'name',
            delimiter: ' ',
            to: ['firstName', 'lastName']
        },
        {
            action: 'MOVE',
            field: 'metadata.imageType',
            to: 'imageData.width'
        },
        {
            action: 'CHANGE_TYPE',
            field: 'imageData.width',
            type: 'number'
        }

    ]
}