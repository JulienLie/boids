class Boid{

    constructor() {
        this.position = createVector(random(width), random(height));
        this.velocity = p5.Vector.random2D();
        this.velocity.setMag(random(2, 4));
        this.acceleration = createVector();
        this.maxForce = 0.2;
        this.maxSpeed = 4;
    }

    edges(){
        if(this.position.x > width){
            this.position.x = 0;
        } else if(this.position.x < 0){
            this.position.x = width;
        }
        if(this.position.y > height){
            this.position.y = 0;
        } else if(this.position.y < 0){
            this.position.y = height;
        }
    }

    flock(boids){
        this.acceleration.mult(0);
        let perception = 100;
        let close = boids.filter(other => {
            return p5.Vector.dist(this.position, other.position) < perception
                && other !== this;
        });
        let alignement = this.align(close);
        let cohesion = this.cohesion(close);
        let seperation = this.seperation(close)

        alignement.mult(alignSlider.value());
        cohesion.mult(cohesionSlider.value());
        seperation.mult(separationSlider.value());

        this.acceleration.add(alignement);
        this.acceleration.add(cohesion);
        this.acceleration.add(seperation);
    }

    align(boids){
        let avg = createVector();
        for(let other of boids){
            avg.add(other.velocity);
        }
        if(boids.length > 0){
            avg.div(boids.length);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
        }
        return avg;
    }

    cohesion(boids){
        let avg = createVector();
        for(let other of boids){
            avg.add(other.position);
        }
        if(boids.length > 0){
            avg.div(boids.length);
            avg.sub(this.position);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
        }
        return avg;
    }

    seperation(boids){
        let avg = createVector();
        for(let other of boids){
            let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
            let diff = p5.Vector.sub(this.position, other.position);
            diff.div(d);
            avg.add(diff);
        }
        if(boids.length > 0){
            avg.div(boids.length);
            avg.setMag(this.maxSpeed);
            avg.sub(this.velocity);
            avg.limit(this.maxForce);
        }
        return avg;
    }

    update(){
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxSpeed);
    }

    show(){
        strokeWeight(1);
        stroke(255);
        let direction = this.velocity.copy();
        direction.setMag(8);
        let baseLeft = createVector(-5, 5);
        let baseRight = createVector(-5, -5);
        baseLeft.setMag(5);
        baseRight.setMag(5);
        //direction.sub(baseUp);
        baseLeft.rotate(direction.heading());
        baseRight.rotate(direction.heading());
        triangle(this.position.x + baseLeft.x, this.position.y + baseLeft.y,
            this.position.x + direction.x, this.position.y + direction.y,
            this.position.x + baseRight.x, this.position.y + baseRight.y);
        stroke(155);
        line(this.position.x, this.position.y, this.position.x + direction.x, this.position.y + direction.y)
        line(this.position.x, this.position.y, this.position.x + baseLeft.x, this.position.y + baseLeft.y)
        line(this.position.x, this.position.y, this.position.x + baseRight.x, this.position.y + baseRight.y)
        //strokeWeight(2)
        //point(this.position.x, this.position.y)
    }
}