import CopyWebpackPlugin=require('copy-webpack-plugin');
new CopyWebpackPlugin([
            {
                from: __dirname+'/settled_enterprise',
                to: __dirname+'/pages/modules/platform_app/',
                ignore: ['.*']
            }
        ])