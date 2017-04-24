angular.module('particles', [])
    .directive('particlesExplosion', ['$interval', Particles]);

function Particles($interval) {

    return {
        restrict: 'E',
        template: '<canvas></canvas>',
        replace: true,
        transclude: true,
        scope: {
            particle: '@',
            count: '=',
            speed: '=',
            size: '=',
            colors: '=',
            spawn: '='
        },

        link: function(scope, el, attrs) {
            var element = el[0];
            var ctx = element.getContext('2d');

            var state = {
                time: 0,
                width: 0,
                height: 0,
                particles: [],
                lastSpawned: 0,
                isFinished: false,
            };

            var config = {
                maxSize: scope.size || 10,
                maxCount: scope.count || 100,
                maxSpeed: scope.speed || 150,
                colors: scope.colors || ['#f00000'],
                spawnTime: scope.spawn ? 1000 / scope.spawn : 10,
            };

            var setSize = function setSize() {
                state.width = window.innerWidth;
                state.height = window.innerHeight;
                element.width = state.width;
                element.height = state.height;
            };

            var spawn = function() {
                state.particles.push({
                    x: state.width / 2,
                    y: state.height / 2,
                    velocity: {
                        x: (config.maxSpeed << 1) * Math.random() - config.maxSpeed,
                        y: (config.maxSpeed << 1) * Math.random() - config.maxSpeed,
                    },
                    size: Math.random() * config.maxSize,
                    color: config.colors[Math.floor(Math.random() * config.colors.length)],
                    alpha: 1,
                });
            };

            var draw = function() {
                ctx.clearRect(0, 0, state.width, state.height);

                state.particles.forEach(function(particle) {
                    ctx.globalAlpha = particle.alpha;
                    ctx.fillStyle = particle.color;
                    ctx.beginPath();
                    ctx.arc(particle.x, particle.y, particle.size, 0, 2 * Math.PI);
                    ctx.fill();
                });
            };

            var update = function(delta) {
                state.lastSpawned += delta;

                while (state.lastSpawned > config.spawnTime) {
                    state.lastSpawned -= config.spawnTime;
                    spawn();
                }

                var particleOverflow = state.particles.length - config.maxCount;

                if (particleOverflow) {
                    state.particles.splice(0, particleOverflow);
                }

                state.particles.map(function(particle) {
                    particle.x += particle.velocity.x * delta / 1000;
                    particle.y += particle.velocity.y * delta / 1000;
                    particle.alpha *= 0.99;

                    return particle;
                });
            };

            var animate = function(elapsed) {
                if (!state.time) {
                    state.time = elapsed;
                }

                var delta = elapsed - state.time;
                state.time = elapsed;

                update(delta);
                draw();

                if (!state.isFinished) {
                    window.requestAnimationFrame(animate);
                }
            };

            setSize();

            window.addEventListener('resize', setSize);
            window.requestAnimationFrame(animate);

            scope.$on('$destroy', function() {
                state.isFinished = true;
            });
        }
    };
}