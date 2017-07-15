deploy:
	cd client/ && \
    npm run build && \
    (git add -f build || true) && \
    (git commit -m 'Adding `build` to source control for heroku deploy') || true && \
    cd ../ && git push heroku master
