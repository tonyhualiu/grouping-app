deploy:
	cd client/ && \
    npm run build && \
    git add -f build && \
    git commit -m 'Adding `build` to source control for heroku deploy' && \
    cd ../ && git push heroku master
