start-backend:
	cd ./node_modules/@hexlet/chat-server && npm start

start-frontend:
	cd ./frontend && npm start

start-dev:
	concurrently "make start-backend" "make start-frontend"
